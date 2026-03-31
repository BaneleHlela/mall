import React, { useEffect, useState } from 'react'
import type { SectionEditorProps } from '../../SectionSettings'
import BackgroundEditor from '../../../background/BackgroundEditor';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import SlidingPanel from '../../../supporting/SlidingPanel';
import { AnimatePresence } from 'framer-motion';
import TextEditor from '../../../text/TextEditor';
import ResponsiveGridSettings from '../../../extras/ResponsiveGridSettings';
import OptionsToggler from '../../../supporting/OptionsToggler';
import { getSetting } from '../../../../../utils/helperFunctions';
import PopularProductCard from '../../../../store_layout/extras/cards/product/popular/PopularProductCard';
import PopularProductCardSettings from '../../products/supporting/cards/PopularProductCardSettings';
import BorderEditor from '../../../background/BorderEditor';
import { Underline } from 'lucide-react';
import UnderlinedTextSettings from '../../../extras/text/UnderlinedTextSettings';
import ColorPicker from '../../../supporting/ColorPicker';
import SettingsSlider from '../../../supporting/SettingsSlider';
import AcceptingOrdersButtonSettings from '../../products/shared/AcceptingOrdersButtonSettings';
import PickupOrDeliverySettings from '../../products/shared/PickupOrDeliverySettings';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X, Plus } from 'lucide-react';
import { fetchStoreProducts } from '../../../../../features/products/productsSlice';
import StoreLayoutButton from '../../../../store_layout/shared_layout_components/StoreLayoutButton';
import StoreLayoutButtonSettings from '../../../extras/StoreLayoutButtonSettings';

interface ProductItem {
  _id: string;
  name: string;
  images?: string[];
}

interface SortableProductItemProps {
  product: ProductItem;
  onRemove: (id: string) => void;
}

const SortableProductItem: React.FC<SortableProductItemProps> = ({ product, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: product._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1">
        <GripVertical size={16} className="text-gray-400" />
      </div>
      {product.images && product.images[0] && (
        <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded" />
      )}
      <span className="flex-1 text-sm font-medium truncate">{product.name}</span>
      <button
        onClick={() => onRemove(product._id)}
        className="p-1 hover:bg-red-100 rounded-full transition-colors"
      >
        <X size={14} className="text-red-500" />
      </button>
    </div>
  );
};

// Product Selection Modal Component
interface ProductSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  selectedIds: string[];
  onToggle: (productId: string) => void;
}

const ProductSelectionModal: React.FC<ProductSelectionModalProps> = ({
  isOpen,
  onClose,
  products,
  selectedIds,
  onToggle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-2xl max-h-[80vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Select Products</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>
        
        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-4">
          {products.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No products available</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {products.map((product) => {
                const isSelected = selectedIds.includes(product._id);
                return (
                  <div
                    key={product._id}
                    onClick={() => onToggle(product._id)}
                    className={`
                      p-3 border rounded-lg cursor-pointer transition-all
                      ${isSelected 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                    `}
                  >
                    {product.images && product.images[0] && (
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-24 object-cover rounded mb-2" 
                      />
                    )}
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    {isSelected && (
                      <span className="text-xs text-blue-600 font-medium">Selected</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="p-4 border-t flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

const PopularFeaturedProductsSectionSettings: React.FC<SectionEditorProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath = 'sections.featuredProducts';
    const store = useAppSelector((state) => state.storeAdmin.store);
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    const dispatch = useAppDispatch();
    
    // Product selection state
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
      settings.featuredProducts?.productIds || []
    );
    const [showProductModal, setShowProductModal] = useState(false);
    
    const allProducts = useAppSelector((state) => state.products.products);
    

    // Fetch store products if applicable
    useEffect(() => {
        if(store?.slug) {
            dispatch(fetchStoreProducts({ storeSlug: store.slug, activeOnly: true }));
        }
    }, [store?.slug, dispatch, store]);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleProductToggle = (productId: string) => {
      const newSelectedIds = selectedProductIds.includes(productId)
        ? selectedProductIds.filter(id => id !== productId)
        : [...selectedProductIds, productId];
      
      setSelectedProductIds(newSelectedIds);
      handleSettingChange(`${objectPath}.productIds`, newSelectedIds);
    };

    const handleProductRemove = (productId: string) => {
      const newSelectedIds = selectedProductIds.filter(id => id !== productId);
      setSelectedProductIds(newSelectedIds);
      handleSettingChange(`${objectPath}.productIds`, newSelectedIds);
    };

    const handleDragEnd = (event: any) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = selectedProductIds.indexOf(active.id as string);
        const newIndex = selectedProductIds.indexOf(over.id as string);
        const newOrder = arrayMove(selectedProductIds, oldIndex, newIndex);
        setSelectedProductIds(newOrder);
        handleSettingChange(`${objectPath}.productIds`, newOrder);
      }
    };

    const selectedProducts = selectedProductIds
      .map(id => allProducts.find(p => p._id === id))
      .filter(Boolean) as ProductItem[];

    const availableProducts = allProducts.filter(
      p => !selectedProductIds.includes(p._id)
    );

    console.log(allProducts)
    
    return (
        <div className='space-y-[.3vh]'>
            {/* Product Selection Modal */}
            <ProductSelectionModal
              isOpen={showProductModal}
              onClose={() => setShowProductModal(false)}
              products={allProducts}
              selectedIds={selectedProductIds}
              onToggle={handleProductToggle}
            />
            {/* Product Selector - NEW */}
            <FirstOrderSubSettingsContainer
                name="Selected Products"
                onClick={() => setActivePanel("productSelector")}
            />

            {/* Background Settings */}
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                    <div className="px-[.8vh] space-y-[.7vh]">
                        <BackgroundEditor
                            objectPath={`${objectPath}.background`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["width", "color", "padding", "placement"]}
                            widthUnit="%"
                            responsiveSize
                            responsivePadding
                        />
                    </div>
                }
            />
            {/* Text */}
            <FirstOrderSubSettingsContainer
                name="Text"
                onClick={() => setActivePanel("Text")}
            />
            {/* <FirstOrderSubSettingsContainer
                name="Category Selector"
                onClick={() => setActivePanel("categorySelector")}
            />
            <FirstOrderSubSettingsContainer
                name="Accepting Orders Button"
                onClick={() => setActivePanel("acceptingOrdersButton")}
            />
            <FirstOrderSubSettingsContainer
                name="Pickup or Delivery"
                onClick={() => setActivePanel("pickupOrDelivery")}
            /> */}
            
            {/* Text */}
            <FirstOrderSubSettingsContainer
                name="Cards"
                onClick={() => setActivePanel("cards")}
            />
            
            {/* Show More Button */}
             <FirstOrderSubSettingsContainer
                name="Show More Button"
                onClick={() => setActivePanel("show_more_button")}
            />
            

            <AnimatePresence>
                {activePanel === "Text" && (
                    <SlidingPanel
                        key="text" isOpen={true} onClose={closePanel} title="Text Settings"
                    >
                        <div className="space-y-[.3vh]">
                            {/* Text */}
                            <FirstOrderSubSettingsContainer
                                name="Heading"
                                onClick={() => setActivePanel("heading")}
                            />
                            {/* Text */}
                            <FirstOrderSubSettingsContainer
                                name="Subheading"
                                onClick={() => setActivePanel("subheading")}
                            />
                        </div>
                        
                    </SlidingPanel>
                )}
                {activePanel === "heading" && (
                    <SlidingPanel key="heading" isOpen={true} onClose={() => setActivePanel("Text")} title="Heading Settings">
                        <div className="space-y-[.3vh]">
                            <TextEditor
                                objectPath={`${objectPath}.text.heading`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["fontFamily", "animation", "weight", "input", "width", "fontSize", "lineHeight", "letterSpacing", "color", "padding", "border", "placement", "textAlign", "textMaxWidth", "underline" ]}
                                responsiveSize
                                useTextarea
                                responsivePadding
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "subheading" && (
                    <SlidingPanel key="subheading" isOpen={true} onClose={() => setActivePanel("Text")} title="subheading Settings">
                        <div className="space-y-[.3vh]">
                            <TextEditor
                                objectPath={`${objectPath}.text.subheading`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["fontFamily", "animation", "weight", "input", "width", "fontSize", "lineHeight", "letterSpacing", "color", "padding", "border", "placement", "textAlign", "textMaxWidth", "underline" ]}
                                responsiveSize
                                useTextarea
                                responsivePadding
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "cards" && (
                    <SlidingPanel key="card" isOpen={true} onClose={closePanel} title="Cards Settings">
                        <div className="space-y-[.3vh]">
                            {/* Container */}
                            <FirstOrderSubSettingsContainer
                                name="Contaner (Background for all cards)"
                                onClick={() => setActivePanel("container")}
                            />
                            {/* Card */}
                            <FirstOrderSubSettingsContainer
                                name="Card"
                                onClick={() => setActivePanel("card")}
                            />
                        </div>
                    </SlidingPanel>    
                )}
                {activePanel === "container" && (
                    <SlidingPanel key="container" isOpen={true} onClose={() => setActivePanel("cards")} title="Container Settings">
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.grid.container.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["width", "position", "color", "padding", "border", "shadow", "position", "zIndex"]}
                                        responsiveSize
                                        responsivePadding
                                        widthUnit="%"
                                    />
                                }
                            />
                            <SubSettingsContainer
                                name="Grid"
                                SettingsComponent={
                                    <>
                                        <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                                            <OptionsToggler
                                                label="Mobile Stack"
                                                options={["horizontal", "vertical"]}
                                                value={getSetting("stack.mobile", settings, objectPath)}
                                                onChange={(value) => handleSettingChange(`${objectPath}.stack.mobile`, value)}
                                            />
                                            <OptionsToggler
                                                label="Desktop Stack"
                                                options={["horizontal", "vertical"]}
                                                value={getSetting("stack.desktop", settings, objectPath)}
                                                onChange={(value) => handleSettingChange(`${objectPath}.stack.desktop`, value)}
                                            />
                                        </div>
                                        <ResponsiveGridSettings
                                            objectPath={`${objectPath}.grid`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            columnOptions={{
                                                mobile: ['1', "2"],
                                                desktop: ['1', '2', '3', '4', '5']
                                            }}
                                            gapRange={{
                                                mobile: { min: 0, max: 50 },
                                                desktop: { min: 0, max: 100 }
                                            }}
                                        />
                                        {/* Check if mobile is horizontal before showing mobile slider */}
                                        {settings.sections.featuredProducts?.stack?.mobile === 'horizontal' && (
                                            <div className="pt-2">
                                                <SettingsSlider
                                                    label="Mobile Swiper Offset"
                                                    value={getSetting("grid.swiperOffset.mobile", settings, objectPath) ?? 0.1}
                                                    min={0}
                                                    max={1}
                                                    step={0.05}
                                                    onChange={(value) => handleSettingChange(`${objectPath}.grid.swiperOffset.mobile`, value)}
                                                />
                                            </div>
                                        )}
                                        {/* Check if desktop is horizontal before showing desktop slider */}
                                        {settings.sections.featuredProducts?.stack?.desktop === 'horizontal' && (
                                            <div className="pt-2">
                                                <SettingsSlider
                                                    label="Desktop Swiper Offset"
                                                    value={getSetting("grid.swiperOffset.desktop", settings, objectPath) ?? 0.1}
                                                    min={0}
                                                    max={1}
                                                    step={0.05}
                                                    onChange={(value) => handleSettingChange(`${objectPath}.grid.swiperOffset.desktop`, value)}
                                                />
                                            </div>
                                        )}
                                    </> 
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "categorySelector" && (
                    <SlidingPanel key="categorySelector" isOpen={true} onClose={closePanel} title="Category Selector">
                        <div className="space-y-[.3vh] border-[.15vh] rounded-[.6vh]">
                            <div className="px-[.65vh]">
                                <OptionsToggler
                                    label="Show"
                                    options={["Yes", "No"]}
                                    value={getSetting("categorySelector.show", settings, objectPath) ? "Yes" : "No"}
                                    onChange={(newValue) =>
                                        handleSettingChange(`${objectPath}.categorySelector.show`, newValue === "Yes")
                                    }
                                />
                            </div>
                            <SubSettingsContainer
                                name="Width"
                                SettingsComponent={
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.categorySelector`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["width"]}
                                        widthUnit='%'
                                        responsiveSize
                                    />
                                }
                            />
                        </div>
                        <div className="space-y-[.3vh]">
                             <SubSettingsContainer
                                 name="Text"
                                 SettingsComponent={
                                     <TextEditor
                                         objectPath={`${objectPath}.categorySelector.text`}
                                         settings={settings}
                                         handleSettingChange={handleSettingChange}
                                         allow={["fontFamily", "fontSize", "color", "weight"]}
                                         responsiveSize
                                     />
                                 }
                             />
                             <SubSettingsContainer
                                 name="Selected Color"
                                 SettingsComponent={
                                     <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                                         <OptionsToggler
                                             label="Selected Color"
                                             options={["primary", "secondary", "accent", "quad", "pent"]}
                                             value={getSetting("categorySelector.selectedColor", settings, objectPath)}
                                             onChange={(newValue) => handleSettingChange(`${objectPath}.categorySelector.selectedColor`, newValue)}
                                         />
                                     </div>
                                 }
                             />
                          </div>
                    </SlidingPanel>
                )}
                {activePanel === "acceptingOrdersButton" && (
                    <SlidingPanel key="acceptingOrdersButton" isOpen={true} onClose={closePanel} title="Accepting Orders Button">
                        <AcceptingOrdersButtonSettings 
                            settings={settings} 
                            handleSettingChange={handleSettingChange} 
                            objectPath={objectPath}
                        />
                    </SlidingPanel>
                )}
                {activePanel === "pickupOrDelivery" && (
                    <SlidingPanel key="pickupOrDelivery" isOpen={true} onClose={closePanel} title="Pickup or Delivery">
                        <PickupOrDeliverySettings 
                            settings={settings} 
                            handleSettingChange={handleSettingChange} 
                            objectPath={objectPath}
                        />
                    </SlidingPanel>
                )}
                {activePanel === "card" && (
                    <SlidingPanel key="card" isOpen={true} onClose={() => setActivePanel("cards")} title="Card Settings">
                        <PopularProductCardSettings 
                            settings={settings} 
                            handleSettingChange={handleSettingChange}
                            objectPath={`${objectPath}.card`}
                        />
                    </SlidingPanel>
                )}
                {activePanel === "productSelector" && (
                    <SlidingPanel key="productSelector" isOpen={true} onClose={closePanel} title="Featured Products">
                        <div className="space-y-4 p-2 max-h-[70vh]">
                            {/* Selected Products - Sortable */}
                            <div>
                                <h4 className="text-sm font-semibold mb-2">Selected Products (drag to reorder):</h4>
                                {selectedProducts.length === 0 ? (
                                    <p className="text-sm text-gray-500 italic py-4 text-center">No products selected. Click "Add Product" to add products.</p>
                                ) : (
                                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                        <SortableContext items={selectedProductIds} strategy={verticalListSortingStrategy}>
                                            <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                                {selectedProducts.map((product) => (
                                                    <SortableProductItem
                                                        key={product._id}
                                                        product={product}
                                                        onRemove={handleProductRemove}
                                                    />
                                                ))}
                                            </div>
                                        </SortableContext>
                                    </DndContext>
                                )}
                            </div>

                            {/* Add Product Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setShowProductModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Plus size={18} />
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "show_more_button" && (
                    <SlidingPanel key="show_more_button" isOpen={true} onClose={closePanel} title="Show More Button Settings">
                        <StoreLayoutButtonSettings
                            objectPath={`${objectPath}.showMoreButton`}
                            settings={settings}
                            responsiveBackground
                        />
                    </SlidingPanel>
                )}

            </AnimatePresence>
        </div>
    )
}

export default PopularFeaturedProductsSectionSettings
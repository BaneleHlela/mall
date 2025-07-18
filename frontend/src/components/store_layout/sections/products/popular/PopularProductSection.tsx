import { useAppSelector } from '../../../../../app/hooks'
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { getGridColumnClasses } from '../../gallery/gallery_with_grouped_images/SingleGroupImages';
import CategorySelector from '../../../extras/category_selector/CategorySelector';
import PopularProductCard from '../../../extras/cards/product/popular/PopularProductCard';
import { useNavigate } from 'react-router-dom';

const PopularProductsSection = () => {
    const settings = useAppSelector((state) => state.layoutSettings.products);
    const products = useAppSelector((state) => state.products.products);
    const store = useAppSelector((state) => state.stores.currentStore);
    const navigate = useNavigate();
    
    const handleProductClick = (productId: string) => {
        if (store && store._id) {
            navigate(`/stores/${store._id}/product/${productId}`);
        } else {
            console.error('Store ID is not available');
        }
    };


    return (
        <div
            style={{
                ...getBackgroundStyles(settings.background),
            }}
        >
            <div className="w-full h-fit">
                {/* Heading */}
                <h1 
                    style={{
                        ...getTextStyles(settings.text.heading)
                    }}
                    className={`w-full
                        ${settings.text.heading.position === "center" && "text-center"}
                        ${settings.text.heading.position === "start" && "text-start"}
                        ${settings.text.heading.position === "end" && "text-end"}
                    `}
                >
                    {settings.text.heading.input}
                </h1>
                
                {/* Subheading */}
                {settings.text.subheading.input && (
                    <h1 
                        style={{
                            ...getTextStyles(settings.text.subheading)
                        }}
                        className={`w-full
                            ${settings.text.subheading.position === "center" && "text-center"}
                            ${settings.text.subheading.position === "start" && "text-start"}
                            ${settings.text.subheading.position === "end" && "text-end"}
                        `}
                    >
                        {settings.text.subheading.input}
                    </h1>
                )}
            </div>
            {/* Categories */}
            {store?.categories.products && settings.categorySelector.show && (
                <div className="w-full pb-4 flex flex-row justify-center">
                    <CategorySelector categories={store?.categories.products || []} style={settings.categorySelector} />
                </div>
            )}
            {/* Grid container */}
            <div 
                className={`w-full flex flex-row
                    ${settings.grid.container.background.position === "center" && "justify-center"}
                    ${settings.grid.container.background.position === "start" && "justify-start"}
                    ${settings.grid.container.background.position === "end" && "justify-end"}
                `} 
            >
                <div 
                    style={{
                        ...getBackgroundStyles(settings.grid.container.background),
                        gap: getResponsiveDimension(settings.grid.gap)
                    }}
                    className={`grid px-1 ${getGridColumnClasses({
                        mobile: settings.grid.columns.mobile,
                        desktop: settings.grid.columns.desktop,
                    })}`}
                >
                    {products.map((product) => (
                        <PopularProductCard
                            key={product._id}
                            title={product.name}
                            imageUrl={product.images[0]}
                            price={product.price}
                            style={settings.card}
                            onClick={() => handleProductClick(product._id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PopularProductsSection;
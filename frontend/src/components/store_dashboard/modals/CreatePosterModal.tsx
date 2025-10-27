import { useEffect, useState } from 'react'
import OptionsToggler from '../../layout_settings/supporting/OptionsToggler'
import SubSettingsContainer from '../../layout_settings/extras/SubSettingsContainer'
import FirstOrderSubSettingsContainer from '../../layout_settings/FirstOrderSubSettingsContainer';
import { AnimatePresence } from 'framer-motion';
import SlidingPanel from '../../layout_settings/supporting/SlidingPanel';
import MultipleLayoutImagesHandler from '../../layout_settings/supporting/MultipleLayoutImagesHandler';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ColorPicker from '../../layout_settings/supporting/ColorPicker';
import SettingsSlider from '../../layout_settings/supporting/SettingsSlider';
import { getLayout } from '../../../features/layouts/layoutSlice';
import { createPoster } from '../../../features/posters/posterSlice';
import { TbLoader3 } from 'react-icons/tb';
import GoogleFontsSelector from '../../layout_settings/text/GoogleFontsSelector';
import InputHandler from '../../layout_settings/supporting/InputHandler';
import RenderDigitalPoster from '../extras/RenderDigitalPoster';


const CreatePosterModal = () => {
    const dispatch = useAppDispatch();
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    const layoutIds = useAppSelector((state) => state.storeAdmin.store?.layouts)
    const selectedLayout = useAppSelector((state) => state.layout.activeLayout);
    const store = useAppSelector((state) => state.storeAdmin.store);
    const isLoading = useAppSelector((state) => state.posters.isLoading)

    const [form, setForm] = useState({
        type: "digital",
        layout: selectedLayout?._id,
        store: store?._id,
        text: {
            input: "",
            fontFamily: "Open Sans",
            color: "",
            fontWeight: "normal",
        },
        variation: 'mobileAndPC',
        background: {
            image: {
                url: "",
                height: "100%",
                width: "100%",
                opacity: "50%",
            },
            color:  "#ffffff",

        },
        deviceColor: "purple",
        images: {
            mobile: ["", "", ""],
            desktop: "",
            tablet: "",
        },
        imageSource: {
            desktop: {
              capture: true,
              page: "home",
              section: "",
            },
            tablet: {
              capture: true,
              page: "home",
              section: "",
            },
            mobile: [{
              capture: true,
              page: "home",
              section: "",
            }]
        }
    })
    console.log(form)
    
    useEffect(() => {
        // @ts-ignore
        if (form.layout && layoutIds?.includes(form.layout)) {
            // Dispatch the action to fetch layout based on form.layout
            dispatch(getLayout(form.layout));
        }
    }, [form.layout, layoutIds, dispatch]);

    const handleCreatePosterClick = async () => {
        try {
          // Dispatch thunk with form data
          // @ts-ignore
          const resultAction = await dispatch(createPoster(form));
      
          if (createPoster.fulfilled.match(resultAction)) {
            console.log("Poster created successfully:", resultAction.payload);
            // setForm({
            //   type: "digital",
            //   layout: "",
            //   store: store?._id,
            //   deviceColor: "",
            //   variation: "mobileAndPC",
            //   background: {
            //     image: { url: "", height: "%", width: "%", opacity: "%" },
            //     color: "",
            //   },
            //   images: {
            //     mobile: ["", "", ""],
            //     desktop: "",
            //     tablet: "",
            //   },
            //   imageSource: {
            //     desktop: { capture: true, page: "home", section: "" },
            //     tablet: { capture: true, page: "home", section: "" },
            //     mobile: [{ capture: true, page: "home", section: "" }],
            //   },
            // });
          } else {
            console.error("Failed to create poster:", resultAction.payload);
          }
        } catch (error) {
          console.error("Error creating poster:", error);
        }
    };
      

    console.log(form);

    return (
        <div className='flex flex-col w-full h-full'>
            {/* Preview */}
            <div className="flex flex-col justify-center items-center w-full h-[40vh]">
                <div className="bg-orange-600 w-[100%] aspect-square scale-70">
                    <RenderDigitalPoster //@ts-ignore
                        config={form} 
                    />
                </div>
            </div>
            {/* Settings */}
            <div className="relative h-[60vh] w-full bg-white border-t space-y-[.3vh] p-[.6vh]">
                <OptionsToggler
                    label="Layout" //@ts-ignore
                    options={[...layoutIds]}
                    value={form.layout || "No layout"}
                    onChange={(newValue) => setForm(prev => ({ ...prev, layout: newValue }))}
                />
                <OptionsToggler
                    label="Variation"
                    options={["mobileOnly", "allDevices", "mobileAndPC"]}
                    value={form.variation}
                    onChange={(newValue) => setForm(prev => ({ ...prev, variation: newValue }))}
                />
                
                <FirstOrderSubSettingsContainer
                    name="Style"
                    onClick={() => setActivePanel("style")}
                />
                <FirstOrderSubSettingsContainer
                    name="images"
                    onClick={() => setActivePanel("images")}
                />
                <button onClick={handleCreatePosterClick} className="border mt-5 bg-orange-500">
                {isLoading ? (
                    <TbLoader3 className="w-6 h-6 animate-spin mx-auto" />
                    ) : (
                    "Create Poster"
                )}
                </button>
                <AnimatePresence>
                    {activePanel === "style" && (
                        <SlidingPanel
                            key="style"
                            isOpen={true}
                            onClose={closePanel}
                            title="Poster Style"
                        >
                            <div className="space-y-[.45vh]">
                                <SubSettingsContainer
                                    name="Background"
                                    SettingsComponent={
                                        <div className=''>
                                            <div className="px-[.7vh]">
                                                <ColorPicker
                                                    label="Color"
                                                    value={form.background.color}
                                                    onChange={(e) =>
                                                        setForm(prev => ({
                                                        ...prev,
                                                        background: {
                                                            ...prev.background,
                                                            color: e.target.value
                                                        }
                                                        }))
                                                    }
                                                    onClear={() =>
                                                        setForm(prev => ({
                                                        ...prev,
                                                        background: {
                                                            ...prev.background,
                                                            color: ""
                                                        }
                                                        }))
                                                    }
                                                />
                                            </div>
                                            
                                            <MultipleLayoutImagesHandler
                                                images={[form.background.image.url]}
                                                min={0}
                                                max={1}
                                                onChange={(newImages) =>
                                                    setForm(prev => ({
                                                        ...prev,
                                                        background: {
                                                            ...prev.background,
                                                            image: {
                                                            ...prev.background.image,
                                                            url: newImages[0]
                                                            }
                                                        }
                                                    }))
                                                }                              
                                            />
                                            {form.background.image.url && (
                                                <div className='px-[.7vh]'>
                                                    <SettingsSlider
                                                        label="Image Height"
                                                        value={parseInt(form.background.image.height)}
                                                        min={1}
                                                        max={150}
                                                        unit="%"
                                                        step={1}
                                                        onChange={(value) =>
                                                            setForm(prev => ({
                                                            ...prev,
                                                            background: {
                                                                ...prev.background,
                                                                image: {
                                                                ...prev.background.image,
                                                                height: `${value}%`
                                                                }
                                                            }
                                                            }))
                                                        }
                                                    />

                                                    <SettingsSlider
                                                        label="Image Width"
                                                        value={parseInt(form.background.image.width)}
                                                        min={1}
                                                        max={150}
                                                        unit="%"
                                                        step={1}
                                                        onChange={(value) =>
                                                            setForm(prev => ({
                                                            ...prev,
                                                            background: {
                                                                ...prev.background,
                                                                image: {
                                                                ...prev.background.image,
                                                                width: `${value}%`
                                                                }
                                                            }
                                                            }))
                                                        }
                                                    />

                                                    <SettingsSlider
                                                        label="Opacity"
                                                        value={parseInt(form.background.image.opacity)}
                                                        min={0}
                                                        max={100}
                                                        unit="%"
                                                        step={1}
                                                        onChange={(value) =>
                                                            setForm(prev => ({
                                                            ...prev,
                                                            background: {
                                                                ...prev.background,
                                                                image: {
                                                                ...prev.background.image,
                                                                opacity: `${value}%`
                                                                }
                                                            }
                                                            }))
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    }
                                />
                                <div className="rounded-[.6vh] border shadow-md bg-stone-50">
                                    <div className="px-[.7vh]">
                                        <ColorPicker
                                            label="Devices Color"
                                            value={form.deviceColor}
                                            onChange={(e) =>
                                                setForm(prev => ({
                                                    ...prev,
                                                    deviceColor: e.target.value
                                                }))
                                            }
                                            onClear={() =>
                                                setForm(prev => ({
                                                    ...prev,
                                                    deviceColor:  "transparent",
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="px-[.65vh]">
                                        <InputHandler
                                            label="Store Name"
                                            value={form.text.input}
                                            onChange={(newValue: string) =>
                                                setForm((prev) => ({
                                                  ...prev,
                                                  text: {
                                                    ...prev.text,
                                                    input: newValue
                                                  }
                                                }))
                                            }                                             
                                        />
                                    </div>
                                    
                                    <div className="flex flex-row justify-between px-[.65vh]">
                                        <p className="">Name Font Family</p>
                                        <GoogleFontsSelector
                                            selectedFont={form.text.fontFamily}
                                            onFontSelect={(font) => {
                                                setForm((prev) => ({
                                                ...prev,
                                                text: {
                                                    ...prev.text,
                                                    fontFamily: font
                                                }
                                                }));
                                            }}
                                        />
                                    </div>
                                    <div className="px-[.65vh]">
                                        <ColorPicker
                                            label="Text Color"
                                            value={form.text.color}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                ...prev,
                                                text: {
                                                    ...prev.text,
                                                    color: e.target.value
                                                }
                                                }))
                                            }
                                            onClear={() =>
                                                setForm((prev) => ({
                                                ...prev,
                                                text: {
                                                    ...prev.text,
                                                    color: "transparent"
                                                }
                                                }))
                                            }
                                        />
                                        <OptionsToggler
                                            label="Font Weight"
                                            options={["normal", "bold", "lighter", "bolder", "100", "200", "300", "400", "500", "600", "700", "800", "900"]}
                                            value={form.text.fontWeight || "normal"}
                                            onChange={(newValue) =>
                                                setForm((prev) => ({
                                                ...prev,
                                                text: {
                                                    ...prev.text,
                                                    fontWeight: newValue
                                                }
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </SlidingPanel>
                    )}
                    {activePanel === "images" && (
                        <SlidingPanel
                            key="images"
                            isOpen={true}
                            onClose={closePanel}
                            title="Images"
                        >
                            <div className="space-y-[.35vh]">
                            <SubSettingsContainer
                                name="Mobile"
                                SettingsComponent={
                                    <div className="space-y-4">
                                        {form.images.mobile.map((img, idx) => {
                                            // Safe fallback if imageSource.mobile idx not exist
                                            const imgSource = form.imageSource.mobile[idx] || { capture: false, page: "home", section: "" };

                                            return (
                                            <div key={idx} className="border rounded p-3 space-y-2">
                                                <div className="font-semibold">Image #{idx + 1}</div>

                                                <OptionsToggler
                                                label="Capture Mode"
                                                options={["Manual", "Auto"]}
                                                value={imgSource.capture ? "Auto" : "Manual"}
                                                onChange={(mode) => {
                                                    const newImageSourceMobile = [...form.imageSource.mobile];
                                                    newImageSourceMobile[idx] = {
                                                    ...imgSource,
                                                    capture: mode === "Auto",
                                                    };
                                                    setForm(prev => ({
                                                    ...prev,
                                                    imageSource: {
                                                        ...prev.imageSource,
                                                        mobile: newImageSourceMobile,
                                                    }
                                                    }));
                                                }}
                                                />

                                                {/* Manual upload */}
                                                {!imgSource.capture && (
                                                    <MultipleLayoutImagesHandler
                                                        images={[img]}
                                                        min={1}
                                                        max={1}
                                                        onChange={(newImages) => {
                                                        const newMobileImages = [...form.images.mobile];
                                                        newMobileImages[idx] = newImages[0];
                                                        setForm(prev => ({
                                                            ...prev,
                                                            images: {
                                                            ...prev.images,
                                                            mobile: newMobileImages,
                                                            }
                                                        }));
                                                        }}
                                                    />
                                                )}

                                                {/* Auto mode: page + section selectors */}
                                                {imgSource.capture && selectedLayout?.routes && (
                                                <>
                                                    <OptionsToggler
                                                    label="Page"
                                                    options={Object.keys(selectedLayout.routes)}
                                                    value={imgSource.page || "home"}
                                                    onChange={(pageKey) => { // @ts-ignore
                                                        const firstSection = selectedLayout.routes[pageKey]?.contains?.[0] || "";
                                                        const newImageSourceMobile = [...form.imageSource.mobile];
                                                        newImageSourceMobile[idx] = {
                                                        ...imgSource,
                                                        page: pageKey,
                                                        section: firstSection,
                                                        };
                                                        setForm(prev => ({
                                                        ...prev,
                                                        imageSource: {
                                                            ...prev.imageSource,
                                                            mobile: newImageSourceMobile,
                                                        }
                                                        }));
                                                    }}
                                                    />

                                                    <OptionsToggler
                                                    label="Section" //@ts-ignore
                                                    options={selectedLayout.routes[imgSource.page || "home"]?.contains || []}
                                                    value={imgSource.section || ""}
                                                    onChange={(section) => {
                                                        const newImageSourceMobile = [...form.imageSource.mobile];
                                                        newImageSourceMobile[idx] = {
                                                        ...imgSource,
                                                        section,
                                                        };
                                                        setForm(prev => ({
                                                        ...prev,
                                                        imageSource: {
                                                            ...prev.imageSource,
                                                            mobile: newImageSourceMobile,
                                                        }
                                                        }));
                                                    }}
                                                    />
                                                </>
                                                )}
                                            </div>
                                            );
                                        })}
                                        </div>
                                    }
                                />
                                <SubSettingsContainer
                                    name="Desktop"
                                    SettingsComponent={
                                        <div className="space-y-2">
                                            <OptionsToggler
                                                label="Capture Mode"
                                                options={["Manual", "Auto"]}
                                                value={form.imageSource.desktop.capture ? "Auto" : "Manual"}
                                                onChange={(mode) =>
                                                setForm(prev => ({
                                                    ...prev,
                                                    imageSource: {
                                                        ...prev.imageSource,
                                                        desktop: {
                                                            ...prev.imageSource.desktop,
                                                            capture: mode === "Auto",
                                                            }
                                                        }
                                                }))
                                                }
                                            />

                                            {/* Manual upload */}
                                            {!form.imageSource.desktop.capture && (
                                                <MultipleLayoutImagesHandler
                                                    images={[form.images.desktop]}
                                                    min={1}
                                                    max={1}
                                                    onChange={(newImages) =>
                                                        setForm(prev => ({
                                                        ...prev,
                                                        images: {
                                                            ...prev.images,
                                                            desktop: newImages[0]
                                                        }
                                                        }))
                                                    }
                                                />
                                            )}

                                            {/* Auto mode: page + section selectors */}
                                            {form.imageSource.desktop.capture && selectedLayout?.routes && (
                                            <>
                                                <OptionsToggler
                                                label="Page"
                                                options={Object.keys(selectedLayout.routes)}
                                                value={form.imageSource.desktop.page || "home"}
                                                onChange={(pageKey) => { //@ts-ignore
                                                    const firstSection = selectedLayout.routes[pageKey]?.contains?.[0] || "";
                                                    setForm(prev => ({
                                                    ...prev,
                                                    imageSource: {
                                                        ...prev.imageSource,
                                                        desktop: {
                                                        ...prev.imageSource.desktop,
                                                        page: pageKey,
                                                        section: firstSection,
                                                        }
                                                    }
                                                    }));
                                                }}
                                                />

                                                <OptionsToggler
                                                label="Section"
                                                options={ //@ts-ignore
                                                    selectedLayout.routes[form.imageSource.desktop.page || "home"]?.contains || []
                                                }
                                                value={form.imageSource.desktop.section || ""}
                                                onChange={(section) =>
                                                    setForm(prev => ({
                                                    ...prev,
                                                    imageSource: {
                                                        ...prev.imageSource,
                                                        desktop: {
                                                        ...prev.imageSource.desktop,
                                                        section,
                                                        }
                                                    }
                                                    }))
                                                }
                                                />
                                            </>
                                            )}
                                        </div>
                                    }
                                />
                                <SubSettingsContainer
                                    name="Tablet"
                                    SettingsComponent={
                                        <div className="space-y-2">
                                            <OptionsToggler
                                                label="Capture Mode"
                                                options={["Manual", "Auto"]}
                                                value={form.imageSource.tablet.capture ? "Auto" : "Manual"}
                                                onChange={(mode) =>
                                                setForm(prev => ({
                                                    ...prev,
                                                    imageSource: {
                                                        ...prev.imageSource,
                                                        tablet: {
                                                            ...prev.imageSource.tablet,
                                                            capture: mode === "Auto",
                                                            }
                                                        }
                                                }))
                                                }
                                            />

                                            {/* Manual upload */}
                                            {!form.imageSource.tablet.capture && (
                                                <MultipleLayoutImagesHandler
                                                    images={[form.images.tablet]}
                                                    min={1}
                                                    max={1}
                                                    onChange={(newImages) =>
                                                        setForm(prev => ({
                                                        ...prev,
                                                        images: {
                                                            ...prev.images,
                                                            tablet: newImages[0]
                                                        }
                                                        }))
                                                    }
                                                />
                                            )}

                                            {/* Auto mode: page + section selectors */}
                                            {form.imageSource.tablet.capture && selectedLayout?.routes && (
                                            <>
                                                <OptionsToggler
                                                label="Page"
                                                options={Object.keys(selectedLayout.routes)}
                                                value={form.imageSource.tablet.page || "home"}
                                                onChange={(pageKey) => { //@ts-ignore
                                                    const firstSection = selectedLayout.routes[pageKey]?.contains?.[0] || "";
                                                    setForm(prev => ({
                                                    ...prev,
                                                    imageSource: {
                                                        ...prev.imageSource,
                                                        tablet: {
                                                        ...prev.imageSource.tablet,
                                                        page: pageKey,
                                                        section: firstSection,
                                                        }
                                                    }
                                                    }));
                                                }}
                                                />

                                                <OptionsToggler
                                                label="Section"
                                                options={ //@ts-ignore
                                                    selectedLayout.routes[form.imageSource.tablet.page || "home"]?.contains || []
                                                }
                                                value={form.imageSource.tablet.section || ""}
                                                onChange={(section) =>
                                                    setForm(prev => ({
                                                    ...prev,
                                                    imageSource: {
                                                        ...prev.imageSource,
                                                        tablet: {
                                                        ...prev.imageSource.tablet,
                                                        section,
                                                        }
                                                    }
                                                    }))
                                                }
                                                />
                                            </>
                                            )}
                                        </div>
                                    }
                                />
                            </div>
                        </SlidingPanel>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default CreatePosterModal;
  
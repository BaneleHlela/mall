import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { fetchStore, updateStoreSetting } from "../../../features/store_admin/storeAdminSlice";
import MultipleLayoutImagesHandler from "../supporting/MultipleLayoutImagesHandler";
import SubSettingsContainer from "../extras/SubSettingsContainer";
import ColorPicker from "../supporting/ColorPicker";
import SettingsSlider from "../supporting/SettingsSlider";

const LogoControl: React.FC = () => {
  const dispatch = useAppDispatch();
  const { store, isLoading } = useAppSelector((state) => state.storeAdmin);
  const images = useAppSelector((state) => state.storeAdmin.store?.images) || [];

  const logo = store?.logo || { imageUrls: [] };


  const handleBackgroundChange = (field: string, value: any) => {
    dispatch(updateStoreSetting({ field: `logo.background.${field}`, value }));
  };

  return (
    <div className="flex flex-col items-center border-2 border-gray-200 rounded-md shadow-md w-full max-w-md py-4 px-2">
      <h2 className="text-lg font-semibold mb-4">Store Logo</h2>

      <div className="w-full space-y-4">
        {/* Image URLs */}
        <div>
          <label className="font-semibold">Logo Images</label>
          <MultipleLayoutImagesHandler
            images={logo.imageUrls}
            max={2}
            min={0}
            onChange={(newUrls) => dispatch(updateStoreSetting({ field: 'logo.imageUrls', value: newUrls }))}
          />
        </div>

        {/* Background Settings */}
        <SubSettingsContainer
          name="Background Settings"
          SettingsComponent={
            <div className="space-y-2 p-2">
              <ColorPicker
                label="Background Color"
                value={logo.background?.color || 'transparent'}
                onChange={(value) => handleBackgroundChange('color', value)}
              />
              <SettingsSlider
                label="Opacity"
                value={logo.background?.opacity || 100}
                unit="%"
                min={0}
                max={100}
                step={1}
                onChange={(value) => handleBackgroundChange('opacity', value)}
              />
              <SettingsSlider
                label="Border Width"
                value={logo.background?.border?.width || 0}
                unit="px"
                min={0}
                max={10}
                step={1}
                onChange={(value) => handleBackgroundChange('border.width', value)}
              />
              <ColorPicker
                label="Border Color"
                value={logo.background?.border?.color || 'transparent'}
                onChange={(value) => handleBackgroundChange('border.color', value)}
              />
              <SettingsSlider
                label="Border Radius"
                value={logo.background?.border?.radius || 0}
                unit="px"
                min={0}
                max={50}
                step={1}
                onChange={(value) => handleBackgroundChange('border.radius', value)}
              />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default LogoControl;

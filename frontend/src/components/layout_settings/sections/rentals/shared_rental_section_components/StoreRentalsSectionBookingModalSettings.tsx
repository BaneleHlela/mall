import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import BackgroundEditor from '../../../background/BackgroundEditor'
import StoreButtonSettings from '../../../extras/StoreButtonSettings'
import SubSettingsContainer from '../../../extras/SubSettingsContainer'
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer'
import SlidingPanel from '../../../supporting/SlidingPanel'
import TextEditor from '../../../text/TextEditor'
import type { SectionEditorProps } from '../../SectionSettings'


const StoreRentalsSectionBookingModalSettings: React.FC<SectionEditorProps> = ({
  settings,
  handleSettingChange
}) => {
  const objectPath = 'sections.rentals.bookingModal'
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const closePanel = () => setActivePanel(null)

  return (
    <div className="space-y-[.3vh]">
      {/* Background */}
      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <div className="px-[.8vh] space-y-[.7vh]">
            <BackgroundEditor
              objectPath={`${objectPath}.background`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={["color", "border"]}
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
      {/* Buttons */}
      <FirstOrderSubSettingsContainer
        name="Buttons"
        onClick={() => setActivePanel("Buttons")}
      />
      {/* Dropdowns */}
      <FirstOrderSubSettingsContainer
        name="Dropdowns"
        onClick={() => setActivePanel("Dropdowns")}
      />
      <AnimatePresence>
        {activePanel === "Text" && (
          <SlidingPanel
            key="text"
            isOpen={true}
            onClose={closePanel}
            title="Text Settings"
          >
            <div className="space-y-[.3vh]">
              <FirstOrderSubSettingsContainer
                name="Selected Dates"
                onClick={() => setActivePanel("selectedDates")}
              />
              <FirstOrderSubSettingsContainer
                name="Selected Rental"
                onClick={() => setActivePanel("selectedRental")}
              />
            </div>
          </SlidingPanel>
        )}
        {activePanel === "selectedDates" && (
          <SlidingPanel
            key="selectedDates"
            isOpen={true}
            onClose={() => setActivePanel("Text")}
            title="Selected Dates Text Settings"
          >
            <TextEditor
              objectPath={`${objectPath}.text.selectedDates`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              responsiveSize
              allow={["color", "input", "fontSize", "fontWeight", "weight", "fontFamily"]}
            />
          </SlidingPanel>
        )}
        {activePanel === "selectedRental" && (
          <SlidingPanel
            key="selectedRental"
            isOpen={true}
            onClose={() => setActivePanel("Text")}
            title="Selected Rental Text Settings"
          >
            <TextEditor
              objectPath={`${objectPath}.text.selectedRental`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              responsiveSize
                allow={["input"]}
            />
          </SlidingPanel>
        )}
        {activePanel === "Buttons" && (
          <SlidingPanel
            key="buttons"
            isOpen={true}
            onClose={closePanel}
            title="Buttons Settings"
          >
            <div className="space-y-[.3vh]">
              <FirstOrderSubSettingsContainer
                name="Select Date Button"
                onClick={() => setActivePanel("selectDateButton")}
              />
              <FirstOrderSubSettingsContainer
                name="Request Booking Button"
                onClick={() => setActivePanel("requestBookingButton")}
              />
            </div>
          </SlidingPanel>
        )}
        {activePanel === "selectDateButton" && (
          <SlidingPanel
            key="selectDateButton"
            isOpen={true}
            onClose={() => setActivePanel("Buttons")}
            title="Select Date Button Settings"
          >
            <StoreButtonSettings
              settings={settings}
              objectPath={`${objectPath}.buttons.selectedDateButton`}
            />
          </SlidingPanel>
        )}
        {activePanel === "requestBookingButton" && (
          <SlidingPanel
            key="requestBookingButton"
            isOpen={true}
            onClose={() => setActivePanel("Buttons")}
            title="Request Booking Button Settings"
          >
            <StoreButtonSettings
              settings={settings}
              objectPath={`${objectPath}.buttons.requestBookingButton`}
            />
          </SlidingPanel>
        )}
        {activePanel === "Dropdowns" && (
          <SlidingPanel
            key="dropdowns"
            isOpen={true}
            onClose={closePanel}
            title="Dropdowns Settings"
          >
            <div className="space-y-[.3vh]">
              <FirstOrderSubSettingsContainer
                name="Calendar Dropdown"
                onClick={() => setActivePanel("calendarsDropdown")}
              />
              <FirstOrderSubSettingsContainer
                name="Rentals Dropdown"
                onClick={() => setActivePanel("rentalsDropdown")}
              />
            </div>
          </SlidingPanel>
        )}
        {activePanel === "calendarsDropdown" && (
          <SlidingPanel
            key="calendarsDropdown"
            isOpen={true}
            onClose={() => setActivePanel("Dropdowns")}
            title="Calendars Dropdown Settings"
          >
            <SubSettingsContainer
              name="Background"
              SettingsComponent={
                <BackgroundEditor
                  objectPath={`${objectPath}.dropdowns.calendars.background`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allow={["color", "border"]}
                />
              }
            />
            <SubSettingsContainer
              name="Month Text"
              SettingsComponent={
                <TextEditor
                  objectPath={`${objectPath}.dropdowns.calendars.monthText`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  responsiveSize
                  allow={["color", "fontSize", "fontWeight", "weight", "fontFamily"]}
                />
              }
            />
            <SubSettingsContainer
              name="Toggle Month Icon"
              SettingsComponent={
                <TextEditor
                  objectPath={`${objectPath}.dropdowns.calendars.toggleMonthIcon`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  responsiveSize
                  allow={["color", "fontSize"]}
                />
              }
            />
            {/* Weekday */}
            <FirstOrderSubSettingsContainer
                name="Weekdays"
                onClick={() => setActivePanel("weekday")}
            />
            {/* Date */}
            <FirstOrderSubSettingsContainer
                name="Calender Dates"
                onClick={() => setActivePanel("date")}
            />
            {/* Today Date */}
            <FirstOrderSubSettingsContainer
                name="Today Dates"
                onClick={() => setActivePanel("todayDate")}
            />
            {/* Selected Date(s) */}
            <FirstOrderSubSettingsContainer
                name="Selected Dates"
                onClick={() => setActivePanel("selectedDate")}
            />
          </SlidingPanel>
        )}
        {/* Weekday */}
        {activePanel === "weekday" && (
          <SlidingPanel
            key="weekday"
            isOpen={true}
            onClose={() => setActivePanel("calendarsDropdown")}
            title="Calendar Weekdays Settings"
          >
            <SubSettingsContainer
              name="Text"
              SettingsComponent={
                <TextEditor
                  objectPath={`${objectPath}.dropdowns.calendars.weekday.text`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  responsiveSize
                  allow={["color", "fontSize", "fontWeight", "weight", "fontFamily"]}
                />
              }
            />
            {/* Underline Color */}
            <SubSettingsContainer
              name="Underline Color"
              SettingsComponent={
                <BackgroundEditor
                  objectPath={`${objectPath}.dropdowns.calendars.weekday.underlineColor`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allow={["color"]}
                />
              }
            />
          </SlidingPanel>
        )}
        {/* Date */}
        {activePanel === "date" && (
          <SlidingPanel
            key="date"
            isOpen={true}
            onClose={() => setActivePanel("calendarsDropdown")}
            title="Calendar Dates Settings"
          >
            <SubSettingsContainer
              name="Text"
              SettingsComponent={
                <TextEditor
                  objectPath={`${objectPath}.dropdowns.calendars.date.text`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  responsiveSize
                  allow={["color", "fontSize", "fontWeight", "weight", "fontFamily"]}
                />
              }
            />
            <SubSettingsContainer
              name="Background"
              SettingsComponent={
                <BackgroundEditor
                  objectPath={`${objectPath}.dropdowns.calendars.date.background`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allow={["color", "border", "padding"]}
                />
              }
            />
          </SlidingPanel>
        )}
        {/* Today's Date */}
        {activePanel === "todayDate" && (
          <SlidingPanel
            key="todayDate"
            isOpen={true}
            onClose={() => setActivePanel("calendarsDropdown")}
            title="Today's Date Settings"
          >
            <SubSettingsContainer
              name="Text"
              SettingsComponent={
                <TextEditor
                  objectPath={`${objectPath}.dropdowns.calendars.todayDate.text`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  responsiveSize
                  allow={["color", "fontSize", "fontWeight", "weight", "fontFamily"]}
                />
              }
            />
            <SubSettingsContainer
              name="Background"
              SettingsComponent={
                <BackgroundEditor
                  objectPath={`${objectPath}.dropdowns.calendars.todayDate.background`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allow={["color", "border", "padding"]}
                />
              }
            />
          </SlidingPanel>
        )}
        {/* Selected Date */}
        {activePanel === "selectedDate" && (
          <SlidingPanel
            key="selectedDate"
            isOpen={true}
            onClose={() => setActivePanel("calendarsDropdown")}
            title="Selected Date(s) Settings"
          >
            <SubSettingsContainer
              name="Text"
              SettingsComponent={
                <TextEditor
                  objectPath={`${objectPath}.dropdowns.calendars.selectedDate.text`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  responsiveSize
                  allow={["color", "fontSize", "fontWeight", "weight", "fontFamily"]}
                />
              }
            />
            <SubSettingsContainer
              name="Background"
              SettingsComponent={
                <BackgroundEditor
                  objectPath={`${objectPath}.dropdowns.calendars.selectedDate.background`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allow={["color", "border", "padding"]}
                />
              }
            />
          </SlidingPanel>
        )}
        {activePanel === "rentalsDropdown" && (
          <SlidingPanel
            key="rentalsDropdown"
            isOpen={true}
            onClose={() => setActivePanel("Dropdowns")}
            title="Rentals Dropdown Settings"
          >
            <SubSettingsContainer
              name="Background"
              SettingsComponent={
                <BackgroundEditor
                  objectPath={`${objectPath}.dropdowns.rentalsDropdown.background`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allow={["color", "border"]}
                />
              }
            />
            <SubSettingsContainer
              name="Text"
              SettingsComponent={
                <TextEditor
                  objectPath={`${objectPath}.dropdowns.rentalsDropdown.text`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  responsiveSize
                />
              }
            />
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  )
}

export default StoreRentalsSectionBookingModalSettings
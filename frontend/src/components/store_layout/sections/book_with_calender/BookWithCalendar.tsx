import FirstBookWithCalandar from "./first/FirstBookWithCalendar"

const BookWithCalendar = () => {
  const type = "first"; 
  if (type === "first") {
    return (
      <FirstBookWithCalandar />
    )
  }
}

export default BookWithCalendar;
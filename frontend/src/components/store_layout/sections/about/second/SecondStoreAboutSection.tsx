import cupcake from "../../../../../assets/cupcake.png";

const SecondStoreAboutSection = () => {
  return (
    <div
      className="w-screen bg-blue-500 p-3"
    >
      {/* Mobile */}
      <div className="p-3 bg-amber-500">
        {/* Title */}
        <div className="">
          <h1 className="">Our Story</h1>
        </div>
        {/* Images*/}
        <div className="">
          <img src={`${cupcake}`} alt="about us image" className="" />
        </div>
        {/* Text */}
        <div className="flex flex-col justify-center">
          <p className="">
            I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.
          </p><br></br>
          <p className="">
            This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide. Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are.          
          </p>
        </div>
      </div>
    </div>
  )
}

export default SecondStoreAboutSection
// Add  sort functionality
// Add viewed stat

interface TopItem {
    id: number
    name: string
    dateAdded: string
    price: number
    totalEarning: number
    image?: string
  }
  
  interface TopItemsTableProps {
    title: string
    products: TopItem[]
  }
  
  const TopItemsTable: React.FC<TopItemsTableProps> = ({ title, products }) => {
    return (
      <div className="blur w-full h-full overflow-y-scroll hide-scrollbar bg-white rounded-[1.2vh] hadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] px-[3vh] pt-[1.5vh]">
        <h2 className="text-[2.5vh] font-semibold">{title}</h2>
        <p className="text-sm text-gray-500 mb-[1vh]">
          Best selling products in your store
        </p>
  
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left font-light text-gray-600 text-[1.8vh]">
                <th className="pb-[.5vh]">Product name</th>
                <th className="pb-[.5vh]">Date added</th>
                <th className="pb-[.5vh]">Price</th>
                <th className="pb-[.5vh]">Total Earnings</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 3).map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-gray-300 text-sm hover:bg-gray-50 transition"
                >
                  <td className="py-[.5vh] flex items-center gap-3">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-8 h-8 rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-md bg-gray-200" />
                    )}
                    {product.name}
                  </td>
                  <td className="py-[.5vh] text-gray-500">{product.dateAdded}</td>
                  <td className="py-[.5vh] font-semibold text-orange-500">
                    R {product.price}
                  </td>
                  <td className="py-[.5vh] font-semibold text-sky-600">
                    R {product.totalEarning.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  export default TopItemsTable
  
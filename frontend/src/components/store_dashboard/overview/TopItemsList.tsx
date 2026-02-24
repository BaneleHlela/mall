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
    <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-500 mt-1">
          Best selling products in your store
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3 hidden sm:table-cell">Date Added</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3 hidden md:table-cell">Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.slice(0, 5).map((product, index) => (
              <tr 
                key={product.id} 
                className="hover:bg-slate-50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-100 group-hover:ring-slate-200 transition-all"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 font-medium text-sm">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-800 truncate max-w-[200px]">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-400 sm:hidden">
                        {product.dateAdded}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span className="text-sm text-slate-500">{product.dateAdded}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-amber-600">
                    R{product.price.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-sm font-semibold text-emerald-600">
                    R{product.totalEarning.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
        <button className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
          View all products →
        </button>
      </div>
    </div>
  )
}

export default TopItemsTable
// src/app/category/[key]/components/CategoryListings.tsx

interface Listing {
    _id: string;
    title: string;
    description: string;
    created_time: string;
    // add other fields as needed
  }
  
  interface Props {
    listings: Listing[];
  }
  
  export default function CategoryListings({ listings }: Props) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <div className="text-xs text-gray-400 mt-2">
              {new Date(item.created_time).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
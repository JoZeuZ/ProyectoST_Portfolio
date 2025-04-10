export default function ServiceCard({ title, price, description }) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-blue-600 dark:text-blue-400 text-2xl mb-3">{price}</p>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    );
  }
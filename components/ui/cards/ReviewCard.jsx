const ReviewCard = ({ name, review, image }) => {
    return (
      <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-4 h-full dark:bg-gray-900 dark:shadow-md">
        <p className="text-gray-700 dark:text-gray-200">{review}</p>
        <div className="flex items-center gap-4 mt-auto">
          <img src={image} alt={name} className="w-10 h-10 rounded-full object-cover" />
          <strong className="text-sm text-gray-900 dark:text-white">{name}</strong>
        </div>
      </div>
    );
  };
  
  export default ReviewCard;
  
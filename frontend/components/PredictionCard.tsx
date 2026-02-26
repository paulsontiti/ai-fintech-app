export default function PredictionCard({
  prediction,
}: any) {
  return (
    <div className="bg-white text-black p-6 rounded-2xl shadow">
      <h3 className="font-semibold">
        Predicted Spending
      </h3>

      <p className="text-2xl mt-2 font-bold">
        ₦{prediction.toLocaleString()}
      </p>
    </div>
  );
}
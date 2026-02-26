import ReactMarkdown from "react-markdown";

export default function AIInsight({
  insight,
}: any) {
  return (
    <div className="bg-blue-50 p-6 rounded-2xl">
      <h3 className="font-bold text-black">
        🤖 AI Recommendation
      </h3>

      <div className="mt-3 text-gray-700">
     <ReactMarkdown>{insight}</ReactMarkdown>
      </div>
    </div>
  );
}
export default function TeacherPage() {
  const analytics = [
    {
      name:
        "Motion Requires Continuous Force",
      count: 42,
      severity: "high",
    },

    {
      name:
        "Balanced Forces Mean Rest",
      count: 28,
      severity: "medium",
    },

    {
      name:
        "Larger Object Exerts Larger Force",
      count: 18,
      severity: "medium",
    },

    {
      name:
        "More Mass Means More Acceleration",
      count: 12,
      severity: "low",
    },
  ];

  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Teacher Analytics
      </h1>

      <h2 className="text-2xl font-semibold mb-4">
        Most Common Misconceptions
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {analytics.map((item) => (
          <div
            key={item.name}
            className="border rounded-lg p-5"
          >
            <p
              className={
                item.severity === "high"
                  ? "text-red-400 text-sm font-medium"
                  : item.severity ===
                    "medium"
                  ? "text-yellow-400 text-sm font-medium"
                  : "text-green-400 text-sm font-medium"
              }
            >
              {item.severity.toUpperCase()}
            </p>

            <h3 className="font-semibold mt-2">
              {item.name}
            </h3>

            <p className="mt-2 text-gray-400">
              {item.count}% of students
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Misconception Distribution
      </h2>

      <div className="space-y-5">
        {analytics.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between mb-1">
              <span>{item.name}</span>

              <span>{item.count}%</span>
            </div>

            <div className="w-full bg-zinc-800 rounded-full h-4">
              <div
                className="bg-red-500 h-4 rounded-full"
                style={{
                  width: `${item.count}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
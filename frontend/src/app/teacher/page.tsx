export default function TeacherPage() {
  const analytics = [
    {
      name:
        "Motion Requires Continuous Force",
      count: 42,
    },

    {
      name:
        "Balanced Forces Mean Rest",
      count: 28,
    },

    {
      name:
        "Larger Object Exerts Larger Force",
      count: 18,
    },

    {
      name:
        "More Mass Means More Acceleration",
      count: 12,
    },
  ];

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Teacher Analytics
      </h1>

      <div className="space-y-4">
        {analytics.map((item) => (
          <div
            key={item.name}
            className="border rounded-lg p-4"
          >
            <div className="flex justify-between">
              <span>{item.name}</span>

              <span>
                {item.count}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
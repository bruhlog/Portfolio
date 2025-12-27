export default function ProjectPage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32">
      <h1 className="text-4xl font-bold mb-6">{params.slug}</h1>
      <p className="text-gray-500">
        Problem → Solution → Tech → Outcome
      </p>
    </div>
  );
}

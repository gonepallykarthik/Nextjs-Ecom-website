import Link from "next/link";

function Expired() {
  return (
    <div>
      <h1 className="text-xl mb-4">
        The link you are trying to access is expired!!{" "}
      </h1>
      <button className="bg-slate-950 p-4 text-white rounded-lg">
        <Link href="/orders"> Get new Link </Link>
      </button>
    </div>
  );
}

export default Expired;

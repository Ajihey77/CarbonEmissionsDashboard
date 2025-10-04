import { companies } from "@/data/companies";
import { reports } from "@/data/reports";

// let _countries = [...countri];
let _companies = [...companies];
let _posts = [...reports];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600;
const maybeFail = () => Math.random() < 0.15;

// export async function fetchCountries() {
//   await delay(jitter());
//   return _countries;
// }

export async function fetchCompanies() {
  await delay(jitter());
  return _companies;
}

export async function fetchPosts() {
  await delay(jitter());
  return _posts;
}

export async function createOrUpdatePost(
  p: Omit<Reports, "id"> & { id?: string }
) {
  await delay(jitter());
  // throw new Error("Save failed");
  if (maybeFail()) throw new Error("Save failed");
  if (p.id) {
    _posts = _posts.map((x) => (x.id === p.id ? (p as Reports) : x));
    return p as Reports;
  }
  const created = { ...p, id: crypto.randomUUID() };
  _posts = [..._posts, created];
  return created;
}

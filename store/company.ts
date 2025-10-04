import { create } from "zustand";

type CompanyState = {
  companyId: string;
  companyName: string;
  country: string;
  setCompany: (id: string, name: string, country: string) => void;
};

export const useCompanyStore = create<CompanyState>((set) => ({
  companyId: "a3",
  companyName: "Acme Corp",
  country: "KR",
  setCompany: (id, name, country) =>
    set({ companyId: id, companyName: name, country: country }),
}));

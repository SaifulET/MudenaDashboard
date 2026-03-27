import {
  BadgePercent,
  CalendarDays,
  Pencil,
  Ticket,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

const initialPacks = [
  {
    id: "01",
    name: "Starter Pack",
    credits: 2,
    gamesAllowed: 1,
    price: 20,
    status: "Active",
    createdDate: "12 Oct 2023",
  },
  {
    id: "02",
    name: "Basic Pack",
    credits: 5,
    gamesAllowed: 4,
    price: 60,
    status: "Active",
    createdDate: "05 Nov 2023",
  },
  {
    id: "03",
    name: "Premium Pack",
    credits: 10,
    gamesAllowed: 8,
    price: 100,
    status: "Active",
    createdDate: "20 Jan 2024",
  },
  {
    id: "04",
    name: "Pro Pack",
    credits: 20,
    gamesAllowed: 18,
    price: 180,
    status: "Active",
    createdDate: "15 Feb 2024",
  },
];

const defaultForm = {
  name: "",
  credits: "10",
  gamesAllowed: "8",
  price: "100.00",
  status: "Active",
  description: "",
};

const discountDefaults = {
  code: "SAVE20",
  type: "Percentage",
  value: "20",
  minPurchase: "$50",
  expiry: "12/30/2026",
  active: true,
};

const QuizPack = () => {
  const [packs, setPacks] = useState(initialPacks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackId, setEditingPackId] = useState(null);
  const [packForm, setPackForm] = useState(defaultForm);
  const [discountSettings, setDiscountSettings] = useState(discountDefaults);

  const openAddModal = () => {
    setEditingPackId(null);
    setPackForm(defaultForm);
    setIsModalOpen(true);
  };

  const openEditModal = (pack) => {
    setEditingPackId(pack.id);
    setPackForm({
      name: pack.name,
      credits: String(pack.credits),
      gamesAllowed: String(pack.gamesAllowed),
      price: pack.price.toFixed(2),
      status: pack.status,
      description: "Perfect for medium-sized trivia tournaments and small groups.",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePackInputChange = (field, value) => {
    setPackForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleDiscountChange = (field, value) => {
    setDiscountSettings((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSavePack = () => {
    const nextPack = {
      id: editingPackId || String(packs.length + 1).padStart(2, "0"),
      name: packForm.name || "New Pack",
      credits: Number(packForm.credits) || 0,
      gamesAllowed: Number(packForm.gamesAllowed) || 0,
      price: Number(packForm.price) || 0,
      status: packForm.status,
      createdDate: editingPackId
        ? packs.find((pack) => pack.id === editingPackId)?.createdDate || "12 Mar 2026"
        : "12 Mar 2026",
    };

    if (editingPackId) {
      setPacks((current) =>
        current.map((pack) => (pack.id === editingPackId ? nextPack : pack))
      );
    } else {
      setPacks((current) => [...current, nextPack]);
    }

    setIsModalOpen(false);
  };

  const handleDeletePack = (packId) => {
    setPacks((current) => current.filter((pack) => pack.id !== packId));
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto mt-[27px] space-y-6 overflow-hidden rounded-2xl border border-gray-600 bg-white p-0">
        <div className="overflow-hidden rounded-t-2xl">
          <div className="flex flex-col gap-4 bg-[#FF0099] px-6 py-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-semibold text-white">Quiz Price pack</h1>
            <button
              onClick={openAddModal}
              className="rounded-md bg-white px-5 py-2 text-sm font-medium text-[#FF0099] transition hover:bg-[#FFF0F8]"
            >
              +Add New Pack
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px]">
              <thead className="bg-[#FFF5FA]">
                <tr className="border-b border-[#F5D7E8]">
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Pack Name
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Credits
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Games Allowed
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Created Date
                  </th>
                  <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {packs.map((pack) => (
                  <tr key={pack.id} className="border-b border-[#F7E4EE]">
                    <td className="px-6 py-5 text-sm font-semibold leading-4 text-[#3D2341]">
                      {pack.name.split(" ").map((part, index) => (
                        <span key={`${pack.id}-${part}-${index}`} className="block">
                          {part}
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-5">
                      <span className="rounded-full bg-[#F8C9E7] px-3 py-1 text-xs font-semibold text-[#B93882]">
                        {String(pack.credits).padStart(2, "0")} Credits
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-[#4B2E4B]">
                      {pack.gamesAllowed} {pack.gamesAllowed === 1 ? "Game" : "Games"}
                    </td>
                    <td className="px-6 py-5 text-sm font-semibold text-[#4B2E4B]">
                      ${pack.price}
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#DDF8EA] px-3 py-1 text-[11px] font-bold uppercase text-[#0A9A60]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0A9A60]" />
                        {pack.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-400">{pack.createdDate}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleDeletePack(pack.id)}
                          className="text-[#FF4D4F] transition hover:text-[#D9363E]"
                          aria-label={`Delete ${pack.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={() => openEditModal(pack)}
                          className="text-[#374151] transition hover:text-[#FF0099]"
                          aria-label={`Edit ${pack.name}`}
                        >
                          <Pencil size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-6 px-6 pb-6 lg:grid-cols-[minmax(0,1.15fr)_330px]">
          <div>
            <div className="flex items-center gap-2">
              <BadgePercent className="text-[#B31174]" size={18} />
              <h2 className="text-[30px] font-semibold tracking-[-0.03em] text-[#45254B]">
                Discount Code Settings
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
                  Discount Code
                </label>
                <input
                  type="text"
                  value={discountSettings.code}
                  onChange={(event) => handleDiscountChange("code", event.target.value)}
                  className="h-12 w-full rounded-2xl bg-[#FDEAF4] px-4 text-sm font-semibold text-[#B31174] outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
                    Type
                  </label>
                  <input
                    type="text"
                    value={discountSettings.type}
                    onChange={(event) => handleDiscountChange("type", event.target.value)}
                    className="h-12 w-full rounded-2xl bg-[#FDEAF4] px-4 text-sm text-[#5B3A5C] outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
                    Value (%)
                  </label>
                  <input
                    type="text"
                    value={discountSettings.value}
                    onChange={(event) => handleDiscountChange("value", event.target.value)}
                    className="h-12 w-full rounded-2xl bg-[#FDEAF4] px-4 text-sm text-[#5B3A5C] outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
                    Min Purchase
                  </label>
                  <input
                    type="text"
                    value={discountSettings.minPurchase}
                    onChange={(event) =>
                      handleDiscountChange("minPurchase", event.target.value)
                    }
                    className="h-12 w-full rounded-2xl bg-[#FDEAF4] px-4 text-sm text-[#5B3A5C] outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
                    Expiry
                  </label>
                  <input
                    type="text"
                    value={discountSettings.expiry}
                    onChange={(event) => handleDiscountChange("expiry", event.target.value)}
                    className="h-12 w-full rounded-2xl bg-[#FDEAF4] px-4 text-sm text-[#5B3A5C] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-[#FDEAF4] px-4 py-3">
                <span className="text-sm font-medium text-[#5B3A5C]">Active Status</span>
                <button
                  onClick={() => handleDiscountChange("active", !discountSettings.active)}
                  className={`flex h-7 w-10 items-center rounded-full px-1 transition ${
                    discountSettings.active ? "bg-[#B31174]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full bg-white transition ${
                      discountSettings.active ? "translate-x-3" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[22px] border border-gray-600 bg-white p-5">
            <div className="absolute inset-y-0 right-0 top-0 w-[4px] bg-[#FF0099]" />
            <div className="flex items-start justify-between">
              <span className="rounded-full bg-[#DDF8EA] px-3 py-1 text-[10px] font-bold uppercase text-[#0A9A60]">
                Live Preview
              </span>
              <Ticket className="text-[#D88BC0]" size={18} />
            </div>

            <div className="mt-5">
              <h3 className="text-[42px] font-bold tracking-[-0.05em] text-[#4A244B]">
                {discountSettings.code}
              </h3>
              <p className="mt-1 text-[28px] font-bold tracking-[-0.04em] text-[#FF0099]">
                {discountSettings.value}% OFF Total
              </p>
            </div>

            <div className="mt-5 border-t border-[#F6D4E7] pt-4 text-sm text-[#6A4B6C]">
              <div className="flex items-start gap-2">
                <BadgePercent size={14} className="mt-0.5 text-[#8B6A8E]" />
                <p>
                  Applies on: Packs over
                  <br />
                  {discountSettings.minPurchase}
                </p>
              </div>
              <div className="mt-3 flex items-start gap-2">
                <CalendarDays size={14} className="mt-0.5 text-[#8B6A8E]" />
                <p>Expiry: 30 Dec 2026</p>
              </div>
            </div>

            <button className="mt-8 w-full rounded-full bg-[#FF0099] px-4 py-4 text-sm font-semibold text-white border border-gray-600 transition hover:bg-[#CC007A]">
              Update Rule
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
          <div className="w-full max-w-[385px] rounded-sm bg-white px-10 py-8 border border-gray-600">
            <div className="flex items-start justify-between">
              <h2 className="text-[18px] font-semibold text-[#412541]">
                Add Pack Details
              </h2>
              <button
                onClick={closeModal}
                className="text-[#412541] transition hover:text-[#FF0099]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
                  Pack Name
                </label>
                <input
                  type="text"
                  value={packForm.name}
                  onChange={(event) => handlePackInputChange("name", event.target.value)}
                  placeholder="Premium Pack"
                  className="h-12 w-full rounded-md border border-[#E6ECF4] px-4 text-sm text-[#4B5563] outline-none transition focus:border-[#FF0099]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
                    Credits
                  </label>
                  <input
                    type="text"
                    value={packForm.credits}
                    onChange={(event) =>
                      handlePackInputChange("credits", event.target.value)
                    }
                    className="h-12 w-full rounded-md border border-[#E6ECF4] px-4 text-sm text-[#4B5563] outline-none transition focus:border-[#FF0099]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
                    Games Allowed
                  </label>
                  <input
                    type="text"
                    value={packForm.gamesAllowed}
                    onChange={(event) =>
                      handlePackInputChange("gamesAllowed", event.target.value)
                    }
                    className="h-12 w-full rounded-md border border-[#E6ECF4] px-4 text-sm text-[#4B5563] outline-none transition focus:border-[#FF0099]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
                    Price ($)
                  </label>
                  <input
                    type="text"
                    value={packForm.price}
                    onChange={(event) => handlePackInputChange("price", event.target.value)}
                    className="h-12 w-full rounded-md border border-[#E6ECF4] px-4 text-sm text-[#4B5563] outline-none transition focus:border-[#FF0099]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
                    Status
                  </label>
                  <select
                    value={packForm.status}
                    onChange={(event) => handlePackInputChange("status", event.target.value)}
                    className="h-12 w-full rounded-md border border-[#E6ECF4] px-4 text-sm text-[#4B5563] outline-none transition focus:border-[#FF0099]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
                  Description
                </label>
                <textarea
                  value={packForm.description}
                  onChange={(event) =>
                    handlePackInputChange("description", event.target.value)
                  }
                  placeholder="Perfect for medium-sized trivia tournaments and small groups."
                  className="min-h-[90px] w-full rounded-md border border-[#E6ECF4] px-4 py-3 text-sm text-[#4B5563] outline-none transition focus:border-[#FF0099]"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={closeModal}
                className="flex-1 rounded-md border border-[#FF0099] px-4 py-3 text-sm font-medium text-[#FF0099] transition hover:bg-[#FFF0F8]"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePack}
                className="flex-1 rounded-md bg-[#FF0099] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#CC007A]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPack;

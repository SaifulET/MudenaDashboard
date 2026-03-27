import { ImagePlus } from "lucide-react";
import { message } from "antd";
import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  imageName: "",
  imagePreview: "",
};

const AdminManagementPage = () => {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setFormData((current) => ({
        ...current,
        imageName: "",
        imagePreview: "",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((current) => ({
        ...current,
        imageName: file.name,
        imagePreview: typeof reader.result === "string" ? reader.result : "",
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    message.success("Admin created successfully");
    setFormData(initialForm);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto mt-[27px] overflow-hidden rounded-2xl border border-gray-600 bg-white">
        <div className="bg-[#FF0099] px-6 py-4">
          <h1 className="text-2xl font-semibold text-white">Create Admin</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#374151]">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(event) => handleChange("name", event.target.value)}
              placeholder="jhon doe"
              className="h-11 w-full rounded-md border border-[#D9E1EC] px-4 text-sm text-[#4B5563] outline-none transition focus:border-[#FF0099]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#374151]">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => handleChange("email", event.target.value)}
              placeholder="abc@gmail.com"
              className="h-11 w-full rounded-md border border-[#D9E1EC] px-4 text-sm text-[#4B5563] outline-none transition focus:border-[#FF0099]"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#374151]">
                New Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(event) => handleChange("password", event.target.value)}
                placeholder="........"
                className="h-11 w-full rounded-md border border-[#D9E1EC] px-4 text-sm text-[#4B5563] outline-none transition focus:border-[#FF0099]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#374151]">
                Confirm New Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(event) =>
                  handleChange("confirmPassword", event.target.value)
                }
                placeholder="........"
                className="h-11 w-full rounded-md border border-[#D9E1EC] px-4 text-sm text-[#4B5563] outline-none transition focus:border-[#FF0099]"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#374151]">
              Profile Image
            </label>
            <label className="flex h-[126px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border border-[#EEF1F5] bg-[#FCFCFC] text-gray-400 transition hover:border-[#FF0099] hover:text-[#FF0099]">
              {formData.imagePreview ? (
                <div className="flex h-full w-full items-center justify-center bg-white p-3">
                  <img
                    src={formData.imagePreview}
                    alt="Profile preview"
                    className="h-full max-h-[100px] w-auto rounded-md object-contain"
                  />
                </div>
              ) : (
                <>
                  <ImagePlus size={18} />
                  <span className="mt-3 text-sm">Upload Image</span>
                </>
              )}
              {formData.imageName && (
                <span className="px-3 pb-2 text-xs text-gray-500">
                  {formData.imageName}
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="w-full max-w-[285px] rounded-md bg-[#FF0099] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#CC007A]"
            >
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminManagementPage;

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Loader2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createCollection } from "@/app/actions/adminActions";
import toast from "react-hot-toast";

interface CollectionsClientProps {
  collections: any[];
}

export function CollectionsClient({ collections }: CollectionsClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState("/images/floral_candle.png");
  const [customImage, setCustomImage] = useState("");

  const presetImages = [
    { label: "Floral Asset", value: "/images/floral_candle.png" },
    { label: "Dark Moody Asset", value: "/images/dark_moody_candle.png" },
    { label: "Fresh Clean Asset", value: "/images/fresh_clean_candle.png" },
    { label: "Warm Cosy Asset", value: "/images/warm_cosy_candle.png" },
    { label: "Brand Story Banner", value: "/images/brand_story.png" },
    { label: "Custom URL", value: "custom" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imageUrl = selectedImage === "custom" ? customImage : selectedImage;
    if (!imageUrl) {
      toast.error("Please provide an image url.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await createCollection({
          name,
          description,
          image: imageUrl
        });

        if (result.success) {
          toast.success("Collection created successfully");
          setIsFormOpen(false);
          setName("");
          setDescription("");
          router.refresh();
        } else {
          toast.error("Failed to create collection");
        }
      } catch (err) {
        toast.error("An error occurred while creating collection");
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-charcoal">Collections</h1>
          <p className="text-sm text-warm-gray mt-1">Manage catalog collections and categorization</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 h-11 uppercase tracking-wider text-xs px-6"
        >
          <Plus className="w-4 h-4" /> Add Collection
        </Button>
      </div>

      {/* Collections Table */}
      <div className="bg-white border border-warm-gray/20 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-warm-gray/20 bg-cream/40 text-xs font-semibold uppercase tracking-wider text-warm-gray/80">
              <th className="p-4 w-24">Banner</th>
              <th className="p-4">Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Description</th>
              <th className="p-4 w-32 text-center">Products Count</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warm-gray/10 text-sm text-charcoal">
            {collections.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-warm-gray">
                  No collections available.
                </td>
              </tr>
            ) : (
              collections.map((col) => {
                return (
                  <tr key={col.id} className="hover:bg-cream/20 transition-colors">
                    <td className="p-4">
                      <div className="relative w-16 h-10 bg-blush border border-warm-gray/10">
                        {col.image && (
                          <Image
                            src={col.image}
                            alt={col.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium font-heading text-lg">{col.name}</td>
                    <td className="p-4 font-mono text-xs text-warm-gray">{col.slug}</td>
                    <td className="p-4 text-xs text-warm-gray max-w-xs truncate">{col.description}</td>
                    <td className="p-4 font-semibold text-center">{col.products?.length || 0}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add Collection Modal */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} className="max-w-md rounded-lg">
        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-charcoal">
              Add New Collection
            </h2>
            <p className="text-xs text-warm-gray mt-1">Define product categorization profile</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Collection Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider font-medium">Collection Name</label>
              <Input
                type="text"
                required
                placeholder="e.g. Earthy & Grounding"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border-warm-gray/30 h-10"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider font-medium">Description</label>
              <textarea
                required
                rows={3}
                placeholder="A short description summarizing this scent category..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-warm-gray/30 bg-white p-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            {/* Banner Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider font-medium">Banner Image Asset</label>
              <select
                value={selectedImage}
                onChange={(e) => setSelectedImage(e.target.value)}
                className="h-10 border border-warm-gray/30 bg-white px-3 focus:outline-none focus:ring-1 focus:ring-gold text-sm w-full"
              >
                {presetImages.map(img => (
                  <option key={img.value} value={img.value}>{img.label}</option>
                ))}
              </select>

              {selectedImage === "custom" && (
                <Input
                  type="text"
                  required
                  placeholder="Enter custom image URL (e.g. /images/custom.png)"
                  value={customImage}
                  onChange={(e) => setCustomImage(e.target.value)}
                  className="bg-white border-warm-gray/30 h-10 mt-1"
                />
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-warm-gray/10 pt-4 mt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-5 py-2 border border-warm-gray text-warm-gray hover:bg-blush/35 text-xs uppercase tracking-wider transition-colors h-11"
              >
                Cancel
              </button>
              <Button
                type="submit"
                variant="primary"
                className="h-11 px-8 text-xs uppercase tracking-wider flex items-center gap-2"
                isLoading={isPending}
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Create Collection
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

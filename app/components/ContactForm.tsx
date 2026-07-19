"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type FormData = z.infer<typeof formSchema>;

import { ThemeHeading, ThemeText, ThemeCard, useTheme } from "./ThemeSystem";

export default function ContactForm() {
  const { tokens, mode } = useTheme();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const errorData = await response.json();
        setStatus("error");
        setErrorMessage(errorData.error || "Failed to submit form");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ThemeCard className="rounded-sm p-8 md:p-16 relative overflow-hidden border-transparent shadow-2xl">
        {/* Subtle decorative accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-crimson-rich"></div>
        
        <div className="text-center mb-12">
          <ThemeHeading className="text-3xl md:text-4xl uppercase tracking-widest mb-4 font-bold">
            Initiate Contact
          </ThemeHeading>
          <ThemeText className="text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Provide your details below, and our advisory team will reach out to discuss your strategic objectives.
          </ThemeText>
        </div>

        {status === "success" && (
          <div className={`${mode === 'dark' ? 'bg-green-900/20 border-green-800 text-green-300' : 'bg-green-50/50 border-green-200 text-green-800'} border p-4 mb-8 flex items-center justify-center font-sans text-sm tracking-wide`}>
            Thank you. Your inquiry has been securely received by our team.
          </div>
        )}

        {status === "error" && (
          <div className={`${mode === 'dark' ? 'bg-red-900/20 border-red-800 text-red-300' : 'bg-red-50/50 border-red-200 text-red-800'} border p-4 mb-8 text-center font-sans text-sm tracking-wide`}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
          <div>
            <label className={`block text-xs font-sans font-bold uppercase tracking-[0.15em] mb-3 ${tokens.heading}`}>
              Full Name
            </label>
            <input
              {...register("name")}
              className={`w-full px-4 py-4 ${mode === 'dark' ? 'bg-white/5' : 'bg-blush-white/30'} border ${errors.name ? 'border-red-400' : tokens.border} rounded-none ${tokens.heading} placeholder-white/20 focus:outline-none focus:border-crimson-rich focus:ring-1 focus:ring-crimson-rich transition-all font-sans text-base`}
              placeholder="e.g. John Doe"
            />
            {errors.name && <p className="text-red-500 text-xs mt-2 font-sans tracking-wide">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className={`block text-xs font-sans font-bold uppercase tracking-[0.15em] mb-3 ${tokens.heading}`}>
                Email Address
              </label>
              <input
                {...register("email")}
                className={`w-full px-4 py-4 ${mode === 'dark' ? 'bg-white/5' : 'bg-blush-white/30'} border ${errors.email ? 'border-red-400' : tokens.border} rounded-none ${tokens.heading} placeholder-white/20 focus:outline-none focus:border-crimson-rich focus:ring-1 focus:ring-crimson-rich transition-all font-sans text-base`}
                placeholder="e.g. john@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-2 font-sans tracking-wide">{errors.email.message}</p>}
            </div>

            <div>
              <label className={`block text-xs font-sans font-bold uppercase tracking-[0.15em] mb-3 ${tokens.heading}`}>
                Phone Number
              </label>
              <input
                {...register("phone")}
                className={`w-full px-4 py-4 ${mode === 'dark' ? 'bg-white/5' : 'bg-blush-white/30'} border ${errors.phone ? 'border-red-400' : tokens.border} rounded-none ${tokens.heading} placeholder-white/20 focus:outline-none focus:border-crimson-rich focus:ring-1 focus:ring-crimson-rich transition-all font-sans text-base`}
                placeholder="e.g. +1 (555) 000-0000"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-2 font-sans tracking-wide">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-crimson-rich hover:bg-red-700 text-white font-sans font-bold text-sm uppercase tracking-[0.2em] py-5 px-6 rounded-none transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
            >
              {status === "loading" ? "Processing..." : "Submit Inquiry"}
            </button>
          </div>
        </form>
      </ThemeCard>
    </div>
  );
}

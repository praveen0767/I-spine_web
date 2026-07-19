"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone").optional(),
  company: z.string().optional(),
  message: z.string().min(5, "Message required"),
});

type FormData = z.infer<typeof formSchema>;

export default function FooterContact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div id="contact" className="w-full">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-[1px] bg-crimson-rich" />
        <h3 className="text-white text-4xl md:text-5xl font-serif font-bold tracking-tight">Contact us</h3>
      </div>
      
      {status === "success" ? (
        <div className="bg-green-500/10 border border-green-500/20 p-8 mb-10 text-green-400 text-lg font-sans rounded-sm">
          Message received. We will be in touch shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <input
                {...register("name")}
                placeholder="NAME*"
                className={`w-full bg-[#1A1A1A]/60 border ${errors.name ? 'border-crimson-rich' : 'border-white/10'} px-6 py-5 text-sm text-white focus:outline-none focus:border-crimson-rich transition-all font-sans uppercase tracking-widest`}
              />
            </div>
            <div className="space-y-2">
              <input
                {...register("email")}
                placeholder="EMAIL*"
                className={`w-full bg-[#1A1A1A]/60 border ${errors.email ? 'border-crimson-rich' : 'border-white/10'} px-6 py-5 text-sm text-white focus:outline-none focus:border-crimson-rich transition-all font-sans uppercase tracking-widest`}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <input
                {...register("phone")}
                placeholder="PHONE NUMBER"
                className={`w-full bg-[#1A1A1A]/60 border ${errors.phone ? 'border-crimson-rich' : 'border-white/10'} px-6 py-5 text-sm text-white focus:outline-none focus:border-crimson-rich transition-all font-sans uppercase tracking-widest`}
              />
            </div>
            <div className="space-y-2">
              <input
                {...register("company")}
                placeholder="ORGANIZATION / CAMPAIGN"
                className="w-full bg-[#1A1A1A]/60 border border-white/10 px-6 py-5 text-sm text-white focus:outline-none focus:border-crimson-rich transition-all font-sans uppercase tracking-widest"
              />
            </div>
          </div>

          <div className="space-y-2">
            <textarea
              {...register("message")}
              placeholder="MESSAGE*"
              rows={4}
              className={`w-full bg-[#1A1A1A]/60 border ${errors.message ? 'border-crimson-rich' : 'border-white/10'} px-6 py-5 text-sm text-white focus:outline-none focus:border-crimson-rich transition-all font-sans uppercase tracking-widest resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-crimson-rich hover:bg-red-700 text-white font-sans font-bold text-xs md:text-sm uppercase tracking-[0.4em] py-6 px-10 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl group"
          >
            {status === "loading" ? "SENDING..." : "SUBMIT INQUIRY"}
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      )}

      <div className="mt-16 flex flex-wrap gap-8 md:gap-12">
        <a 
          href="mailto:ispineofficial@gmail.com" 
          className="group flex items-center gap-4 text-[#D8E1F2] hover:text-white transition-all duration-300"
        >
          <div className="p-3 bg-white/5 rounded-full group-hover:bg-crimson-rich transition-colors">
            <Mail className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Email Us</span>
            <span className="text-sm md:text-base font-sans font-bold tracking-wider">ispineofficial@gmail.com</span>
          </div>
        </a>

        <a 
          href="tel:+918825217931" 
          className="group flex items-center gap-4 text-[#D8E1F2] hover:text-white transition-all duration-300"
        >
          <div className="p-3 bg-white/5 rounded-full group-hover:bg-crimson-rich transition-colors">
            <Phone className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Call Support</span>
            <span className="text-sm md:text-base font-sans font-bold tracking-wider">+91 88252 17931</span>
          </div>
        </a>
      </div>

    </div>
  );
}

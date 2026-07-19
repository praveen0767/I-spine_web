"use client";
import { useState } from "react";
import { Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import { METRIC_GLOSSARY, MetricGlossaryNode } from "@/lib/glossary";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";

interface MetricCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  glossaryKey?: keyof typeof METRIC_GLOSSARY;
  icon?: React.ReactNode;
}

export function MetricCard({ title, value, subValue, glossaryKey, icon }: MetricCardProps) {
  const [open, setOpen] = useState(false);
  const glossaryNode = glossaryKey ? METRIC_GLOSSARY[glossaryKey] : null;

  return (
    <Card className="bg-white border-[var(--color-surface-soft)] shadow-sm relative overflow-hidden flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-bold text-[var(--color-navy-premium)] uppercase tracking-widest opacity-60">
          {title}
        </CardTitle>
        <div className="absolute top-4 right-4 text-[var(--color-navy-premium)] opacity-10">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight text-[var(--color-navy-premium)]">{value}</div>
        {subValue && (
          <p className="text-xs text-[var(--color-neutral-charcoal)] mt-1 font-medium opacity-60">{subValue}</p>
        )}
        
        {glossaryNode && (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <button className="flex items-center space-x-1 text-xs text-[var(--color-crimson-rich)] mt-4 font-bold uppercase tracking-wider opacity-80 hover:opacity-100 transition-all">
                <Info className="h-3.5 w-3.5" />
                <span>Methodology Brief</span>
              </button>
            </DrawerTrigger>
            <DrawerContent className="bg-[var(--color-bg-main)] text-[var(--color-text-secondary)] border-[var(--color-surface-soft)] max-w-3xl mx-auto rounded-t-2xl overflow-hidden shadow-2xl">
              <div className="p-8 max-h-[85vh] overflow-y-auto w-full max-w-4xl mx-auto relative">
                <div className="absolute top-0 left-0 w-full h-1 gold-gradient opacity-80" />
                <DrawerHeader className="px-0 pb-6 border-b border-[var(--color-surface-soft)]">
                  <DrawerTitle className="text-3xl font-bold text-[var(--color-navy-premium)]">{glossaryNode.name}</DrawerTitle>
                  <DrawerDescription className="text-lg mt-3 text-[var(--color-neutral-charcoal)] opacity-70 leading-relaxed">
                    {glossaryNode.meaning}
                  </DrawerDescription>
                </DrawerHeader>
                
                <div className="py-8 space-y-8">
                  <div>
                    <h4 className="font-bold text-[var(--color-navy-premium)] text-xs uppercase tracking-widest mb-3 opacity-60">Operational Formula</h4>
                    <div className="bg-white p-6 rounded-xl border border-[var(--color-surface-soft)] text-base font-mono text-[var(--color-navy-premium)] shadow-inner">
                      {glossaryNode.formula}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-[var(--color-navy-premium)] text-xs uppercase tracking-widest mb-4 opacity-60">Threshold Logic</h4>
                      <div className="space-y-2">
                        {glossaryNode.thresholds.map((t, idx) => (
                           <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg border border-[var(--color-surface-soft)] shadow-sm">
                              <span className="font-bold text-sm text-[var(--color-navy-premium)]">{t.label}</span>
                              <span className="text-xs font-mono bg-[var(--color-surface-soft)] px-2 py-1 rounded text-[var(--color-neutral-charcoal)]">{t.value}</span>
                           </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-[var(--color-navy-premium)] p-6 rounded-xl border border-[var(--color-navy-deep)] shadow-lg shadow-blue-900/10">
                        <h4 className="font-bold text-white/50 text-xs uppercase tracking-widest mb-3">Strategic Mandate</h4>
                        <p className="text-sm text-white leading-relaxed font-medium">{glossaryNode.action}</p>
                      </div>
                      <div className="bg-white p-6 rounded-xl border border-[var(--color-surface-soft)] shadow-sm border-l-4 border-l-[var(--color-gold-refined)]">
                        <h4 className="font-bold text-[var(--color-gold-refined)] text-xs uppercase tracking-widest mb-3">Impact Analysis</h4>
                        <p className="text-sm text-[var(--color-neutral-charcoal)] leading-relaxed opacity-80">{glossaryNode.whyItMatters}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <DrawerFooter className="px-0 pt-6 border-t border-[var(--color-surface-soft)]">
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full sm:w-auto h-12 uppercase tracking-widest font-bold">Close Methodology</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </CardContent>
    </Card>
  );
}

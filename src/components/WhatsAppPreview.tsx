import { cn } from "@/lib/utils";
import { Wifi, Battery, Signal, ChevronLeft, Phone, Video, MoreVertical } from "lucide-react";

interface WhatsAppPreviewProps {
  header?: string;
  body: string;
  footer?: string;
  buttons?: string[];
  headerImage?: boolean;
  className?: string;
}

const WhatsAppPreview = ({ header, body, footer, buttons, headerImage, className }: WhatsAppPreviewProps) => {
  // Replace template variables with styled pills
  const renderText = (text: string) => {
    return text.split(/(\{\{[^}]+\}\})/).map((part, i) => {
      if (part.match(/^\{\{[^}]+\}\}$/)) {
        return (
          <span key={i} className="rounded bg-emerald-200/60 px-1 py-0.5 text-emerald-800 font-medium text-[11px]">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className={cn("w-full max-w-[320px] mx-auto", className)}>
      {/* Phone frame */}
      <div className="rounded-[2rem] border-[3px] border-foreground/10 bg-[#0b141a] shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 py-1.5 text-white/70">
          <span className="text-[10px] font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <Battery className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* WhatsApp header bar */}
        <div className="flex items-center gap-2 bg-[#1f2c34] px-3 py-2">
          <ChevronLeft className="h-5 w-5 text-emerald-400" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
            B
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Business</p>
            <p className="text-[10px] text-white/50">online</p>
          </div>
          <div className="flex items-center gap-3 text-emerald-400">
            <Video className="h-4 w-4" />
            <Phone className="h-4 w-4" />
            <MoreVertical className="h-4 w-4" />
          </div>
        </div>

        {/* Chat area */}
        <div
          className="min-h-[380px] p-3"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundColor: "#0b141a",
          }}
        >
          {/* Date chip */}
          <div className="mb-3 flex justify-center">
            <span className="rounded-lg bg-[#1d2b33] px-3 py-1 text-[10px] text-white/50">
              TODAY
            </span>
          </div>

          {/* Message bubble */}
          <div className="max-w-[85%]">
            <div className="rounded-lg rounded-tl-none bg-[#1f2c34] shadow-sm overflow-hidden">
              {/* Header image placeholder */}
              {headerImage && (
                <div className="h-32 bg-gradient-to-br from-emerald-600/30 to-emerald-800/30 flex items-center justify-center">
                  <span className="text-white/40 text-xs">Image Header</span>
                </div>
              )}

              <div className="p-2.5">
                {/* Header text */}
                {header && (
                  <p className="text-[13px] font-bold text-white mb-1">{renderText(header)}</p>
                )}

                {/* Body */}
                <p className="text-[12.5px] leading-[1.45] text-white/90 whitespace-pre-wrap">
                  {renderText(body)}
                </p>

                {/* Footer */}
                {footer && (
                  <p className="mt-1.5 text-[10.5px] text-white/40">{renderText(footer)}</p>
                )}

                {/* Timestamp */}
                <div className="mt-1 flex justify-end">
                  <span className="text-[9px] text-white/30">9:41 AM</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            {buttons && buttons.length > 0 && (
              <div className="mt-0.5 space-y-0.5">
                {buttons.map((btn, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center rounded-lg bg-[#1f2c34] py-2 text-[12.5px] font-medium text-emerald-400"
                  >
                    {btn}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 bg-[#1f2c34] px-3 py-2">
          <div className="flex-1 rounded-full bg-[#2a3942] px-4 py-2">
            <span className="text-xs text-white/30">Type a message</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600">
            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPreview;

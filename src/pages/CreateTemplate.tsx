import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText, Image, MousePointerClick, LayoutGrid,
  Plus, Trash2, Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import WhatsAppPreview from "@/components/WhatsAppPreview";
import DashboardLayout from "@/layouts/DashboardLayout";
import { PageBackLink } from "@/modules/dashboard";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const templateTypes = [
  { id: "text", label: "Text", icon: FileText, desc: "Plain text message" },
  { id: "image", label: "Image", icon: Image, desc: "Message with image header" },
  { id: "button", label: "Button", icon: MousePointerClick, desc: "Interactive buttons" },
  { id: "carousel", label: "Carousel", icon: LayoutGrid, desc: "Multi-card carousel" },
] as const;

const variableSuggestions = ["{{name}}", "{{order_id}}", "{{amount}}", "{{date}}", "{{link}}", "{{brand}}"];

const CreateTemplate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("en");
  const [type, setType] = useState("text");
  const [headerText, setHeaderText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [footerText, setFooterText] = useState("");
  const [buttons, setButtons] = useState<string[]>([]);
  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const addButton = () => {
    if (buttons.length < 3) setButtons([...buttons, ""]);
  };

  const updateButton = (i: number, val: string) => {
    const updated = [...buttons];
    updated[i] = val;
    setButtons(updated);
  };

  const removeButton = (i: number) => {
    setButtons(buttons.filter((_, idx) => idx !== i));
  };

  const insertVariable = (variable: string) => {
    setBodyText((prev) => prev + variable);
  };

  const handleSave = () => {
    toast({
      title: "Template Created!",
      description: "Your template has been submitted for review.",
    });
    navigate("/templates");
  };

  const canSave = name.trim().length > 0 && category.length > 0 && bodyText.trim().length > 0;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">
        <PageBackLink to="/templates">Back to Templates</PageBackLink>

        <h1 className="mb-2 font-display text-2xl font-bold tracking-tight">
          Create Template
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Design your WhatsApp message template
        </p>

        <div className="grid gap-8 lg:grid-cols-[1fr,360px]">
          {/* Editor */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Template Details */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-semibold mb-5">Template Details</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="tpl-name">Template Name</Label>
                  <Input
                    id="tpl-name"
                    placeholder="e.g., Welcome Message"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="utility">Utility</SelectItem>
                      <SelectItem value="authentication">Authentication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="pt">Portuguese</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Template Type */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-semibold mb-5">Template Type</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {templateTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setType(t.id);
                      if (t.id === "button" || t.id === "carousel") {
                        if (buttons.length === 0) setButtons([""]);
                      }
                      if (t.id === "image") setShowHeader(true);
                    }}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border p-4 transition-all hover:border-primary/50",
                      type === t.id
                        ? "border-primary bg-accent ring-1 ring-primary"
                        : "border-border"
                    )}
                  >
                    <t.icon className={cn("h-5 w-5", type === t.id ? "text-primary" : "text-muted-foreground")} />
                    <span className="text-sm font-medium">{t.label}</span>
                    <span className="text-[10px] text-muted-foreground text-center">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Editor */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-semibold mb-5">Message Editor</h2>
              <div className="space-y-5">
                {/* Header toggle */}
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium">Header</p>
                    <p className="text-xs text-muted-foreground">
                      {type === "image" ? "Image header" : "Optional text header"}
                    </p>
                  </div>
                  <Switch checked={showHeader} onCheckedChange={setShowHeader} />
                </div>
                {showHeader && type !== "image" && (
                  <div className="space-y-2">
                    <Label>Header Text</Label>
                    <Input
                      placeholder="Bold header text..."
                      value={headerText}
                      onChange={(e) => setHeaderText(e.target.value)}
                      maxLength={60}
                    />
                    <p className="text-xs text-muted-foreground text-right">{headerText.length}/60</p>
                  </div>
                )}
                {showHeader && type === "image" && (
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-8">
                    <div className="text-center">
                      <Image className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium">Upload header image</p>
                      <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                )}

                {/* Body */}
                <div className="space-y-2">
                  <Label>Body Message</Label>
                  <Textarea
                    placeholder="Type your message here. Use {{variable}} for dynamic content..."
                    value={bodyText}
                    onChange={(e) => setBodyText(e.target.value)}
                    rows={5}
                    maxLength={1024}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {variableSuggestions.map((v) => (
                        <button
                          key={v}
                          onClick={() => insertVariable(v)}
                          className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{bodyText.length}/1024</span>
                  </div>
                </div>

                {/* Footer toggle */}
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium">Footer</p>
                    <p className="text-xs text-muted-foreground">Optional footer text</p>
                  </div>
                  <Switch checked={showFooter} onCheckedChange={setShowFooter} />
                </div>
                {showFooter && (
                  <div className="space-y-2">
                    <Label>Footer Text</Label>
                    <Input
                      placeholder="e.g., Reply STOP to unsubscribe"
                      value={footerText}
                      onChange={(e) => setFooterText(e.target.value)}
                      maxLength={60}
                    />
                  </div>
                )}

                {/* Buttons */}
                {(type === "button" || type === "carousel") && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Buttons</Label>
                      {buttons.length < 3 && (
                        <Button variant="outline" size="sm" className="gap-1.5 h-7 text-xs" onClick={addButton}>
                          <Plus className="h-3 w-3" /> Add Button
                        </Button>
                      )}
                    </div>
                    {buttons.map((btn, i) => (
                      <div key={i} className="flex gap-2">
                        <Input
                          placeholder={`Button ${i + 1} label`}
                          value={btn}
                          onChange={(e) => updateButton(i, e.target.value)}
                          maxLength={25}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-destructive"
                          onClick={() => removeButton(i)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => navigate("/templates")}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!canSave} className="gap-2">
                <Save className="h-4 w-4" /> Submit for Review
              </Button>
            </div>
          </motion.div>

          {/* Preview panel */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="hidden lg:block"
          >
            <div className="sticky top-8">
              <p className="mb-4 text-sm font-medium text-muted-foreground">Live Preview</p>
              <WhatsAppPreview
                header={showHeader && type !== "image" ? headerText : undefined}
                body={bodyText || "Your message will appear here..."}
                footer={showFooter ? footerText : undefined}
                buttons={buttons.filter((b) => b.trim().length > 0)}
                headerImage={type === "image" && showHeader}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTemplate;

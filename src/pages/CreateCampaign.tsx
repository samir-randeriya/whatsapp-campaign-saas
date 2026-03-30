import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Send, Clock, Check, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Stepper from "@/components/Stepper";
import DashboardLayout from "@/layouts/DashboardLayout";
import { PageBackLink } from "@/modules/dashboard";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const steps = [
  { label: "Details" },
  { label: "Audience" },
  { label: "Template" },
  { label: "Schedule" },
  { label: "Preview" },
];

const templates = [
  { id: "1", name: "Promotional Offer", category: "Marketing", preview: "🎉 Hi {{name}}! Don't miss our exclusive offer — get 20% off on all products. Shop now!" },
  { id: "2", name: "Order Confirmation", category: "Transactional", preview: "✅ Hi {{name}}, your order #{{order_id}} has been confirmed. Track it here: {{link}}" },
  { id: "3", name: "Welcome Message", category: "Onboarding", preview: "👋 Welcome to {{brand}}, {{name}}! We're excited to have you. Here's how to get started..." },
  { id: "4", name: "Payment Reminder", category: "Billing", preview: "💳 Hi {{name}}, your payment of {{amount}} is due on {{date}}. Pay now to avoid late fees." },
];

const tags = ["VIP", "New User", "Inactive", "Premium", "Trial"];

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [contactList, setContactList] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [scheduleType, setScheduleType] = useState("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const canNext = () => {
    switch (currentStep) {
      case 0: return campaignName.trim().length > 0;
      case 1: return contactList.length > 0;
      case 2: return selectedTemplate.length > 0;
      case 3: return scheduleType === "now" || (scheduleDate && scheduleTime);
      default: return true;
    }
  };

  const handleSend = () => {
    toast({
      title: "Campaign Created!",
      description: scheduleType === "now"
        ? "Your campaign is being sent now."
        : `Campaign scheduled for ${scheduleDate} at ${scheduleTime}.`,
    });
    navigate("/campaigns");
  };

  const selectedTpl = templates.find((t) => t.id === selectedTemplate);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        <PageBackLink to="/campaigns">Back to Campaigns</PageBackLink>

        <h1 className="mb-2 font-display text-2xl font-bold tracking-tight">
          Create Campaign
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Set up your WhatsApp campaign in a few steps
        </p>

        {/* Stepper */}
        <Stepper steps={steps} currentStep={currentStep} className="mb-10" />

        {/* Step Content */}
        <div className="rounded-xl border border-border bg-card p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step 1: Details */}
              {currentStep === 0 && (
                <div className="space-y-5">
                  <h2 className="font-display text-lg font-semibold">Campaign Details</h2>
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Spring Sale 2026"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desc">Description (optional)</Label>
                    <Textarea
                      id="desc"
                      placeholder="Brief description of your campaign..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Audience */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <h2 className="font-display text-lg font-semibold">Select Audience</h2>
                  <div className="space-y-2">
                    <Label>Contact List</Label>
                    <Select value={contactList} onValueChange={setContactList}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a contact list" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Customers (12,450)</SelectItem>
                        <SelectItem value="premium">Premium Users (3,200)</SelectItem>
                        <SelectItem value="newsletter">Newsletter Subscribers (8,100)</SelectItem>
                        <SelectItem value="new">New Signups (1,560)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tags (optional)</Label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer select-none"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Template */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <h2 className="font-display text-lg font-semibold">Select Template</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {templates.map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id)}
                        className={cn(
                          "rounded-lg border p-4 text-left transition-all hover:border-primary/50",
                          selectedTemplate === tpl.id
                            ? "border-primary bg-accent ring-1 ring-primary"
                            : "border-border"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{tpl.name}</span>
                          {selectedTemplate === tpl.id && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          {tpl.category}
                        </span>
                      </button>
                    ))}
                  </div>
                  {selectedTpl && (
                    <div className="rounded-lg border border-border bg-muted/50 p-4">
                      <p className="mb-2 text-xs font-medium text-muted-foreground">Preview</p>
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <MessageSquare className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-sm leading-relaxed">{selectedTpl.preview}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Schedule */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <h2 className="font-display text-lg font-semibold">Schedule</h2>
                  <RadioGroup value={scheduleType} onValueChange={setScheduleType}>
                    <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                      <RadioGroupItem value="now" id="now" />
                      <Label htmlFor="now" className="flex cursor-pointer items-center gap-2">
                        <Send className="h-4 w-4 text-primary" />
                        Send Now
                      </Label>
                    </div>
                    <div className="rounded-lg border border-border p-4">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="schedule" id="schedule" />
                        <Label htmlFor="schedule" className="flex cursor-pointer items-center gap-2">
                          <Clock className="h-4 w-4 text-info" />
                          Schedule for Later
                        </Label>
                      </div>
                      {scheduleType === "schedule" && (
                        <div className="mt-4 grid gap-3 pl-7 sm:grid-cols-2">
                          <div className="space-y-1.5">
                            <Label htmlFor="date" className="text-xs">Date</Label>
                            <Input
                              id="date"
                              type="date"
                              value={scheduleDate}
                              onChange={(e) => setScheduleDate(e.target.value)}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="time" className="text-xs">Time</Label>
                            <Input
                              id="time"
                              type="time"
                              value={scheduleTime}
                              onChange={(e) => setScheduleTime(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 5: Preview & Send */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <h2 className="font-display text-lg font-semibold">Preview & Send</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-xs text-muted-foreground">Campaign</p>
                        <p className="mt-1 font-medium text-sm">{campaignName}</p>
                      </div>
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-xs text-muted-foreground">Audience</p>
                        <p className="mt-1 font-medium text-sm">
                          {contactList === "all" ? "All Customers" :
                            contactList === "premium" ? "Premium Users" :
                              contactList === "newsletter" ? "Newsletter Subscribers" :
                                "New Signups"}
                        </p>
                      </div>
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-xs text-muted-foreground">Template</p>
                        <p className="mt-1 font-medium text-sm">{selectedTpl?.name}</p>
                      </div>
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-xs text-muted-foreground">Schedule</p>
                        <p className="mt-1 font-medium text-sm">
                          {scheduleType === "now" ? "Send Immediately" : `${scheduleDate} at ${scheduleTime}`}
                        </p>
                      </div>
                    </div>

                    {selectedTpl && (
                      <div className="rounded-lg border border-border bg-muted/50 p-4">
                        <p className="mb-2 text-xs font-medium text-muted-foreground">Message Preview</p>
                        <div className="flex gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <MessageSquare className="h-4 w-4 text-primary" />
                          </div>
                          <p className="text-sm leading-relaxed">{selectedTpl.preview}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((s) => s - 1)}
              disabled={currentStep === 0}
              className="gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep((s) => s + 1)}
                disabled={!canNext()}
                className="gap-1.5"
              >
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSend} className="gap-1.5">
                <Send className="h-4 w-4" /> Confirm & Send
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateCampaign;

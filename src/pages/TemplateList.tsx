import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { PageHeader, StatCard } from "@/modules/dashboard";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  FileText,
  Image,
  MousePointerClick,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WhatsAppPreview from "@/components/WhatsAppPreview";
import { DataTable } from "@/components/common/DataTable";
import { createTemplateTableColumns } from "@/components/common/templateTableColumns";
import { mockTemplates, type Template } from "@/data/mockTemplates";
import { motion } from "framer-motion";

const typeIcons: Record<string, typeof FileText> = {
  text: FileText,
  image: Image,
  button: MousePointerClick,
  carousel: LayoutGrid,
};

const PAGE_SIZE = 6;

const TemplateList = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filtered = mockTemplates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    const matchesType = typeFilter === "all" || t.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const templateStats = [
    { label: "Total Templates", value: String(mockTemplates.length) },
    {
      label: "Approved",
      value: String(mockTemplates.filter((t) => t.status === "approved").length),
    },
    {
      label: "Pending Review",
      value: String(mockTemplates.filter((t) => t.status === "pending").length),
    },
    {
      label: "Rejected",
      value: String(mockTemplates.filter((t) => t.status === "rejected").length),
    },
  ];

  const columns = useMemo(
    () =>
      createTemplateTableColumns(typeIcons, (tpl) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-2" onClick={() => setPreviewTemplate(tpl)}>
              <Eye className="h-3.5 w-3.5" /> Preview
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Pencil className="h-3.5 w-3.5" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-destructive">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )),
    []
  );

  const emptyState = (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <FileText className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">No templates found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
      <Link to="/templates/create">
        <Button size="sm" className="mt-2 gap-2">
          <Plus className="h-3.5 w-3.5" /> Create Template
        </Button>
      </Link>
    </div>
  );

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PageHeader
          title="Templates"
          description="Manage your WhatsApp message templates"
          action={{ to: "/templates/create", label: "Create Template", icon: Plus }}
        />

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {templateStats.map((s) => (
            <StatCard key={s.label} item={s} />
          ))}
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[150px]">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={typeFilter}
            onValueChange={(v) => {
              setTypeFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="button">Button</SelectItem>
              <SelectItem value="carousel">Carousel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DataTable
          columns={columns}
          data={paginated}
          getRowId={(t) => t.id}
          emptyState={emptyState}
          footer={
            filtered.length > PAGE_SIZE ? (
              <div className="flex items-center justify-between px-4 py-3">
                <p className="text-xs text-muted-foreground">
                  Showing {(page - 1) * PAGE_SIZE + 1}–
                  {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i}
                      variant={page === i + 1 ? "default" : "outline"}
                      size="icon"
                      className="h-8 w-8 text-xs"
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : null
          }
        />
      </motion.div>

      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-sm border-none bg-transparent p-0 shadow-none overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>{previewTemplate?.name} Preview</DialogTitle>
          </DialogHeader>
          {previewTemplate && (
            <WhatsAppPreview
              header={previewTemplate.header}
              body={previewTemplate.body}
              footer={previewTemplate.footer}
              buttons={previewTemplate.buttons}
              headerImage={previewTemplate.type === "image"}
            />
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TemplateList;

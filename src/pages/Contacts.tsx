import { PageHeader } from "@/modules/dashboard";
import DashboardLayout from "@/layouts/DashboardLayout";
import { DataTable, type DataTableColumn } from "@/components/common/DataTable";
import { mockContacts, type Contact } from "@/data/mockContacts";
import { motion } from "framer-motion";

const columns: DataTableColumn<Contact>[] = [
  {
    id: "name",
    header: "Name",
    cell: (c) => <span className="font-medium">{c.name}</span>,
  },
  {
    id: "email",
    header: "Email",
    cell: (c) => <span className="text-muted-foreground">{c.email}</span>,
  },
  {
    id: "phone",
    header: "Phone",
    headerClassName: "hidden md:table-cell",
    className: "hidden text-muted-foreground md:table-cell",
    cell: (c) => <span>{c.phone}</span>,
  },
  {
    id: "tags",
    header: "Tags",
    headerClassName: "hidden lg:table-cell",
    className: "hidden lg:table-cell",
    cell: (c) => <span className="text-muted-foreground">{c.tags}</span>,
  },
  {
    id: "added",
    header: "Added",
    headerClassName: "hidden md:table-cell",
    className: "hidden text-muted-foreground md:table-cell",
    cell: (c) => (
      <span>
        {c.added
          ? new Date(c.added).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "—"}
      </span>
    ),
  },
];

const Contacts = () => (
  <DashboardLayout>
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Contacts"
        description="Manage your contact lists and segments"
      />
      <DataTable
        columns={columns}
        data={mockContacts}
        getRowId={(c) => c.id}
        emptyState="No contacts yet. Import a list to get started."
      />
    </motion.div>
  </DashboardLayout>
);

export default Contacts;

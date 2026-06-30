"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Pencil, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteButton } from "@/components/admin/delete-button";

export type Column = { key: string; label: string };

function isImage(str: string) {
  return /^https?:\/\//.test(str) && /\.(png|jpe?g|webp|gif|avif)/i.test(str.split("?")[0]);
}

function Cell({ value }: { value: unknown }) {
  if (typeof value === "boolean") {
    return (
      <Badge variant={value ? "default" : "secondary"}>{value ? "Sim" : "Não"}</Badge>
    );
  }
  if (Array.isArray(value)) {
    return <span className="text-muted-foreground">{value.length} item(s)</span>;
  }
  const str = value == null ? "" : String(value);
  if (isImage(str)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={str} alt="" className="h-10 w-16 rounded-md object-cover ring-1 ring-border" />;
  }
  return <span className="line-clamp-1 max-w-[320px]">{str}</span>;
}

export function DataTable({
  entityKey,
  label,
  labelPlural,
  columns,
  rows,
}: {
  entityKey: string;
  label: string;
  labelPlural: string;
  columns: Column[];
  rows: Record<string, unknown>[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      Object.values(row).some((v) => {
        if (v == null) return false;
        if (Array.isArray(v)) return v.join(" ").toLowerCase().includes(q);
        return String(v).toLowerCase().includes(q);
      }),
    );
  }, [rows, query]);

  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
      {/* Cabeçalho do card: título + busca + novo */}
      <div className="flex flex-col gap-3 border-b bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold leading-none text-primary">{labelPlural}</h1>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {filtered.length} de {rows.length} registro(s)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar..."
              className="h-9 w-44 pl-8 sm:w-56"
            />
          </div>
          <Button asChild size="sm">
            <Link href={`/admin/${entityKey}/new`}>
              <Plus className="mr-1.5 size-4" />
              Novo
            </Link>
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="p-10 text-center text-sm text-muted-foreground">
          {rows.length === 0
            ? "Nenhum registro ainda. Clique em “Novo” para começar."
            : "Nenhum resultado para a busca."}
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((col) => (
                <TableHead key={col.key} className="text-xs uppercase tracking-wide">
                  {col.label}
                </TableHead>
              ))}
              <TableHead className="w-24 text-right text-xs uppercase tracking-wide">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((row, i) => (
              <motion.tr
                key={String(row.id)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.025, 0.3) }}
                className="border-b transition-colors hover:bg-muted/50"
              >
                {columns.map((col, ci) => (
                  <TableCell key={col.key} className={ci === 0 ? "font-medium" : ""}>
                    <Cell value={row[col.key]} />
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button asChild variant="ghost" size="icon" className="size-8">
                      <Link href={`/admin/${entityKey}/${row.id}/edit`}>
                        <Pencil className="size-4" />
                      </Link>
                    </Button>
                    <DeleteButton
                      entityKey={entityKey}
                      id={Number(row.id)}
                      label={label.toLowerCase()}
                    />
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

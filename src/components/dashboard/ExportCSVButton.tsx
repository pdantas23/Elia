"use client";

export function ExportCSVButton() {
  const handleExport = async () => {
    // Fetch all leads matching current filters and export as CSV
    const params = new URLSearchParams(window.location.search);
    params.delete("page");

    const response = await fetch(`/api/leads/export?${params.toString()}`);
    if (!response.ok) return;

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="rounded-md border border-muted px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
    >
      Exportar CSV
    </button>
  );
}

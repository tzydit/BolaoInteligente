const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export function formatDatePT(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const diff = date.getTime() - hoje.getTime();
  const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Amanhã";
  if (diffDays === -1) return "Ontem";

  return `${day} ${meses[month - 1]}`;
}

export function formatDateFullPT(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return `${diasSemana[date.getDay()]}, ${day} de ${meses[month - 1]} de ${year}`;
}

export function formatTime(timeStr?: string): string {
  if (!timeStr) return "";
  return timeStr.replace(" UTC-6", "").replace(" UTC-5", "").replace(" UTC-4", "");
}

export function isToday(dateStr: string): boolean {
  const hoje = new Date().toISOString().slice(0, 10);
  return dateStr === hoje;
}

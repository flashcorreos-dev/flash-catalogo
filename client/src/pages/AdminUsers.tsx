import { ShieldCheck, ShieldOff, RefreshCw, Users, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";

const formatDate = (value: Date | string | null) => value ? new Date(value).toLocaleDateString("es-AR", { dateStyle: "medium" }) : "Nunca";

export default function AdminUsers() {
  const { user, loading } = useAuth();
  const isAdmin = user?.role === "admin";
  const { data: users = [], isLoading, refetch } = trpc.users.adminList.useQuery(undefined, { enabled: isAdmin });
  const setRole = trpc.users.adminSetRole.useMutation();
  const [query, setQuery] = useState("");
  const [pendingRevoke, setPendingRevoke] = useState<{ id: number; name: string | null; email: string | null } | null>(null);

  if (loading) return <div className="admin-loading"><RefreshCw className="animate-spin" size={20} /> Cargando usuarios...</div>;
  if (!user) return <div className="admin-gate"><ShieldCheck size={28} /><h1>Gestión de administradores</h1><p>Iniciá sesión para continuar.</p><button onClick={startLogin} className="cta-dark">Ingresar</button></div>;
  if (!isAdmin) return <div className="admin-gate"><ShieldCheck size={28} /><h1>Acceso restringido</h1><p>Esta sección está disponible únicamente para administradores.</p><Link href="/"><span className="cta-dark">Volver al catálogo</span></Link></div>;

  const filteredUsers = users.filter(account => `${account.name ?? ""} ${account.email ?? ""} ${account.phone ?? ""}`.toLowerCase().includes(query.trim().toLowerCase()));
  const changeRole = async (userId: number, name: string | null, role: "user" | "admin") => {
    try {
      await setRole.mutateAsync({ userId, role });
      await refetch();
      setPendingRevoke(null);
      toast.success(role === "admin" ? "Cuenta promovida a administradora" : "Rol de administrador quitado");
    } catch (error) { toast.error(error instanceof Error ? error.message : "No pudimos actualizar el rol."); }
  };

  return <><section className="admin-page"><div className="admin-page-header"><div><p className="eyebrow">FLASH · Administración</p><h1>Administradores</h1><p>Otorgá o quitá permisos de gestión a las cuentas registradas.</p></div><button type="button" onClick={() => void refetch()} className="admin-refresh"><RefreshCw size={15} /> Actualizar</button></div><div className="admin-catalog-note"><LockKeyhole size={18} /><p>Las cuentas <strong>luisardomorales@hotmail.com</strong>, <strong>flashcorreos@gmail.com</strong> y <strong>flashcorreos@hotmail.com</strong> están protegidas y siempre conservarán el rol administrador.</p></div><label className="admin-catalog-search"><Users size={16} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar por nombre, email o celular..." /><span>{filteredUsers.length} cuentas</span></label>{isLoading ? <div className="admin-empty"><RefreshCw className="animate-spin" size={20} /> Cargando cuentas...</div> : <div className="admin-users-list">{filteredUsers.map(account => <article className="admin-user-card" key={account.id}><div className="admin-user-avatar">{(account.name || account.email || "?").charAt(0).toUpperCase()}</div><div className="admin-user-info"><strong>{account.name || "Cuenta sin nombre"}</strong><span>{account.email || "Sin email"}</span><small>{account.phone || "Sin celular"} · Último acceso: {formatDate(account.lastSignedIn)}</small></div><div className="admin-user-role"><span className={account.role === "admin" ? "admin-role-badge" : "user-role-badge"}>{account.role === "admin" ? "Administrador" : "Cliente"}</span>{account.protectedAdmin ? <span className="admin-protected-badge"><LockKeyhole size={12} /> Protegida</span> : account.role === "admin" ? <button type="button" className="admin-revoke-role" onClick={() => setPendingRevoke({ id: account.id, name: account.name, email: account.email })} disabled={setRole.isPending}><ShieldOff size={14} /> Quitar rol</button> : <button type="button" className="admin-grant-role" onClick={() => void changeRole(account.id, account.name, "admin")} disabled={setRole.isPending}><ShieldCheck size={14} /> Hacer administrador</button>}</div></article>)}</div>}{!isLoading && filteredUsers.length === 0 && <div className="admin-empty"><Users size={22} /><h2>No encontramos cuentas</h2><p>Probá con otro nombre, email o celular.</p></div>}</section>{pendingRevoke && <div className="admin-exit-backdrop" role="dialog" aria-modal="true"><div className="admin-exit-dialog"><p className="eyebrow">Confirmar cambio de permisos</p><h2>¿Quitar rol de administrador?</h2><p>La cuenta <strong>{pendingRevoke.name || pendingRevoke.email || "seleccionada"}</strong> dejará de acceder al panel y a las herramientas de gestión de FLASH.</p><div className="admin-exit-actions"><button type="button" className="admin-exit-secondary" onClick={() => setPendingRevoke(null)}>Cancelar</button><button type="button" className="admin-revoke-role" onClick={() => void changeRole(pendingRevoke.id, pendingRevoke.name, "user")} disabled={setRole.isPending}><ShieldOff size={14} /> {setRole.isPending ? "Quitando..." : "Sí, quitar rol"}</button></div></div></div>}</>;
}

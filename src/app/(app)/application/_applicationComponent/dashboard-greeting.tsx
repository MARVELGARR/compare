export default function DashboardGreeting({ userName = "James" }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">Welcome {userName}!</p>
      <h2 className="text-2xl font-semibold text-foreground">Dashboard Overview</h2>
    </div>
  )
}

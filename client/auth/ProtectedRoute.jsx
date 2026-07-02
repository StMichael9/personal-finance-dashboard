function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading == true) {
    return "Loading";
  }

  if (user) {
    return children;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
}

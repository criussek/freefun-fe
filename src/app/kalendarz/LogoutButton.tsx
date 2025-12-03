'use client'

export default function LogoutButton() {
  const handleLogout = () => {
    // Clear the jwtToken cookie
    document.cookie = 'jwtToken=; path=/; max-age=0'
    // Redirect to login page
    window.location.href = '/kalendarz/login'
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
    >
      Wyloguj
    </button>
  )
}

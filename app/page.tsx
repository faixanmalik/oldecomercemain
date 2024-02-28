'use client'

const Home = () => {

  async function logout() {
    const resp = await fetch(`/api/logout`, {
      method: 'POST'
    })
    const { success } = await resp.json()

    if (success) window.location.href = '/login'
    else alert('Logout failed')
  }

  return (
    <>
      <h1 className="text-4xl font-semibold">Home</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Home;


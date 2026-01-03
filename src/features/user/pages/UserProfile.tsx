import ProfileForm from "../components/Profile-Form"
import UserBlogsTable from "../components/User-Blogs-Table"

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <ProfileForm />
        <UserBlogsTable />
      </div>
    </div>
  )
}

export default UserProfile
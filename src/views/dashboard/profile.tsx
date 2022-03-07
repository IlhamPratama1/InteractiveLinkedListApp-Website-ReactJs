export default function ProfileView() {
    return (
        <div className="h-full grid grid-cols-4">
            <div className="col-span-3 font-roboto space-y-8">
                <div className="bg-green-light rounded-lg">
                    <div className="flex items-center">
                        <img className='w-96' src='/static/illustrations/profile.svg' alt='profile' />
                        <div className="space-y-2">
                            <h1 className='font-bold text-3xl'>My Profile</h1>
                            <p className='w-96 text-md opacity-60'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-3 flex space-x-8">
                        <div className="profile-image">
                            <div className="w-32 h-32 bg-cyan-dark rounded-full"></div>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <h1 className="text-sm text-cyan-dark">Username</h1>
                                <h1 className="text-lg">Ilham Pratama</h1>
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-sm text-cyan-dark">Email</h1>
                                <h1 className="text-lg">pratamailham206@gmail.com</h1>
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-sm text-cyan-dark">Role</h1>
                                <h1 className="text-lg">User</h1>
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-sm text-cyan-dark">Detail</h1>
                                <h1 className="text-lg">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</h1>
                            </div>
                            <button className="rounded-md px-10 py-3 bg-blue-dark hover:text-cyan-dark text-cyan-light font-bold text-md transition duration-500">Edit</button>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="bg-green-dark rounded-lg py-1 pl-4 pr-6 flex items-center justify-between">
                            <img alt="project" className="w-32 h-32" src='/static/illustrations/phone.svg' />
                            <div className="text-right space-y-1">
                                <h1 className="text-6xl font-bold">12</h1>
                                <p className="text-sm opacity-60">Total Project</p>
                            </div>
                        </div>
                        <div className="bg-green-light rounded-lg py-1 pl-4 pr-6 flex items-center justify-between">
                            <img alt="quest" className="w-32 h-32" src='/static/illustrations/laptop.svg' />
                            <div className="text-right space-y-1">
                                <h1 className="text-6xl font-bold">12</h1>
                                <p className="text-sm opacity-60">Quest Complete</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
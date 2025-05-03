import { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Données de test (tu pourras remplacer ça par des données Firestore plus tard)
    const fakeData = [
      {
        id: 1,
        message: '🚨 Poste 2 a un retard de 10 min',
        type: 'warning',
        time: '16:45',
      },
      {
        id: 2,
        message: '✅ Opérateur 3 a terminé en avance',
        type: 'success',
        time: '16:30',
      },
      {
        id: 3,
        message: '🆘 Opérateur 1 a demandé de l’aide',
        type: 'alert',
        time: '16:15',
      },
    ]
    setNotifications(fakeData)
  }, [])

  const getColorClasses = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
      case 'alert':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-6 h-6 text-orange-500" />
        <h1 className="text-2xl font-bold text-[#1A2236] dark:text-white">
          Notifications
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {notifications.map((notif) => (
          <Card
            key={notif.id}
            className={`rounded-2xl shadow-md ${getColorClasses(notif.type)}`}
          >
            <CardContent className="p-4 flex justify-between items-start">
              <div className="text-sm font-medium">{notif.message}</div>
              <div className="text-xs opacity-60">{notif.time}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Notifications

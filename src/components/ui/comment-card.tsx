import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CommentCardProps {
  avatarSrc: string
  name: string
  content: string
}

export default function CommentCard({ avatarSrc, name, content }: CommentCardProps) {
  return (
    <Card className="max-w-full mx-auto">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={avatarSrc} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="text-sm text-gray-500 mt-1">{content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


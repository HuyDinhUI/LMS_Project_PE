
import * as Avatar from "@radix-ui/react-avatar";


type AvatarProps = {
    size?: string
	img: string
}

const AvatarDemo = ({size = '25px', img}:AvatarProps) => (
	<div className="flex gap-5">
		<Avatar.Root className={`inline-flex select-none items-center size-[25px] justify-center overflow-hidden rounded-full`}>
			<Avatar.Image
				className={`size-full rounded-[inherit] object-cover`}
				src={img}
				alt="Colm Tuite"
			/>
			<Avatar.Fallback
				className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium"
				delayMs={600}
			>
			</Avatar.Fallback>
		</Avatar.Root>
	</div>
);

export default AvatarDemo;
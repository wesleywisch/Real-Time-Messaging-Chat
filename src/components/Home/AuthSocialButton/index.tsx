import { IconType } from 'react-icons'

type AuthSocialButtonProps = {
  Icon: IconType;
  onClick: () => void;
  disabled: boolean;
}

export function AuthSocialButton({ Icon, onClick, disabled }: AuthSocialButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 transition-colors disabled:opacity-50"
    >
      <Icon />
    </button>
  )
}
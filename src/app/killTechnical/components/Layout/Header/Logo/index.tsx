import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {

    return (
        <Link href="/">
            <Image
                src="/apple-touch-icon3.png"
                alt="logo"
                width={160}
                height={50}
                style={{ height: 'auto' }}
                quality={100}
                className='dark:hidden'
            />
            <Image
                // src="/images/footer/footer-logo-white.svg"
                src="/apple-touch-icon3.png"
                alt="logo"
                width={160}
                height={50}
                style={{ height: 'auto' }}
                // style={{ width: 'auto', height: 'auto' }}
                quality={100}
                className='dark:block hidden'
            />
        </Link>
    );
};

export default Logo;
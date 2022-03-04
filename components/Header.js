import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  background-color: white;
  padding: 10px 15px;
  border-radius: 4px;
  margin: 8px 8px 20px;
  outline: 5px double black;
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <Link href={'/'}>
        <a>{'Home'}</a>
      </Link>
      <Link href={'/login'}>
        <a>{'Login'}</a>
      </Link>
      <Link href={'/account'}>
        <a>{'Account'}</a>
      </Link>
      <Link href={'/game'}>
        <a>{'Game'}</a>
      </Link>
    </header>
  );
}

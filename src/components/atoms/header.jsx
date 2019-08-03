import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const H1 = styled.h1`
	font-size: 2.5rem;
`;

export default props => <header>
	<H1>
		<Link className="logo" to="/">Cranach Digital Archive</Link>
	</H1>
</header>
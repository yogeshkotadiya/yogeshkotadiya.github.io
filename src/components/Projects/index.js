import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

import { rhythm } from "utils/typography";
import TopProjects from "./TopProjects";

const AllProjectQuery = graphql`
  query AllProjectQuery {
    github {
      viewer {
        repositories(
          first: 30
          orderBy: { field: STARGAZERS, direction: DESC }
          affiliations: COLLABORATOR
        ) {
          edges {
            node {
              name
              description
              url
              stargazers {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`;

const Projects = () => {
  return (
    <ProjectStyled>
      <h1 className="page-heading">Projects</h1>
      <TopProjects />
      <h1 className="page-heading">All Projects</h1>
      <StaticQuery
        query={AllProjectQuery}
        render={data => {
          const repos = data.github.viewer.repositories.edges;
          return repos.map(({ node }) => (
            <li className="listStyle" key={node.url}>
              <h2>
                <a target="_blank" rel="noopener noreferrer" href={node.url}>
                  {node.name}
                </a>
              </h2>
              <p className="stargazer">
                <svg
                  className="octicon octicon-star v-align-text-bottom"
                  viewBox="0 0 14 16"
                  version="1.1"
                  width="16"
                  height="14"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
                  />
                </svg>
                {node.stargazers.totalCount}
              </p>
              <p>{node.description}</p>
            </li>
          ));
        }}
      />
    </ProjectStyled>
  );
};

export default Projects;

const ProjectStyled = styled.div`
  font-family: "montserrat";
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${rhythm(2 / 4)};
  h2 {
    margin-top: ${rhythm(2 / 4)};
  }
  .listStyle {
    margin: 10px 0;
    padding: 5px;
    padding-left: 10px;
    list-style: none;
    font-size: 1.4rem;
    height: 100%;
    background-color: ${props => props.theme.backgroundColor};
    border-radius: 10px;
    transition: all 0.2s ease;
    &:hover {
      border-left: 5px solid ${props => props.theme.primary};
      transform: translateX(5px);
      box-shadow: 1px 0 6px ${props => props.theme.dropShadow};
    }
    .octicon {
      fill: ${props => props.theme.textColor};
    }
  }
`;

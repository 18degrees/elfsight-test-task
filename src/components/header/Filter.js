import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

const statuses = ['Dead', 'Alive', 'unknown'];
const genders = ['Female', 'Male', 'Genderless', 'unknown'];
const species = [
  'Human',
  'Alien',
  'Humanoid',
  'Robot',
  'Animal',
  'unknown',
  'Cronenberg',
  'Poopybutthole',
  'Disease',
  'Mythological Creature'
];

export function Filter() {
  const queryParams = new URL(window.location.href).searchParams;

  const [status, setStatus] = useState(queryParams.get('status') ?? 'Status');
  const [gender, setGender] = useState(queryParams.get('gender') ?? 'Gender');
  const [specie, setSpecie] = useState(queryParams.get('species') ?? 'Species');
  const [name, setName] = useState(queryParams.get('name') ?? '');
  const [type, setType] = useState(queryParams.get('type') ?? '');

  const [isStatusMenuOpened, setIsStatusMenuOpened] = useState(false);
  const [isGenderMenuOpened, setIsGenderMenuOpened] = useState(false);
  const [isSpeciesMenuOpened, setIsSpeciesMenuOpened] = useState(false);

  useEffect(() => {
    window.addEventListener('click', (e) => {
      const target = e.target;
      const isItToggler =
        target.classList.contains('toggler') ||
        target.classList.contains('svg-icon');

      if (!isItToggler) {
        closeMenus();
      } else {
        if (target.classList.contains('status')) {
          setIsGenderMenuOpened(false);
          setIsSpeciesMenuOpened(false);
        } else if (target.classList.contains('gender')) {
          setIsStatusMenuOpened(false);
          setIsSpeciesMenuOpened(false);
        } else if (target.classList.contains('species')) {
          setIsStatusMenuOpened(false);
          setIsGenderMenuOpened(false);
        }
      }
    });
    function closeMenus() {
      setIsStatusMenuOpened(false);
      setIsGenderMenuOpened(false);
      setIsSpeciesMenuOpened(false);
    }
  }, []);

  const toggleMenu = useCallback((menuName) => {
    return () => {
      switch (menuName) {
        case 'status':
          setIsStatusMenuOpened((prev) => !prev);
          break;
        case 'gender':
          setIsGenderMenuOpened((prev) => !prev);
          break;
        case 'species':
          setIsSpeciesMenuOpened((prev) => !prev);
          break;
        default:
          return;
      }
    };
  }, []);

  const setDefaultValue = useCallback((menuName) => {
    return () => {
      switch (menuName) {
        case 'status':
          setStatus('Status');
          break;
        case 'gender':
          setGender('Gender');
          break;
        case 'species':
          setSpecie('Species');
          break;
        default:
          return;
      }
    };
  }, []);

  const changeMenuValue = useCallback((menuName, newValue) => {
    return () => {
      switch (menuName) {
        case 'status':
          setStatus(newValue);
          break;
        case 'gender':
          setGender(newValue);
          break;
        case 'species':
          setSpecie(newValue);
          break;
        default:
          return;
      }
    };
  }, []);

  const changeName = useCallback((event) => {
    const newValue = event.target.value;

    setName(newValue);
  }, []);

  const changeType = useCallback((event) => {
    const newValue = event.target.value;

    setType(newValue);
  }, []);

  const applyFilters = useCallback(() => {
    const pathToModify = new URL(window.location.href);

    status !== 'Status'
      ? pathToModify.searchParams.set('status', status)
      : pathToModify.searchParams.delete('status');
    gender !== 'Gender'
      ? pathToModify.searchParams.set('gender', gender)
      : pathToModify.searchParams.delete('gender');
    specie !== 'Species'
      ? pathToModify.searchParams.set('species', specie)
      : pathToModify.searchParams.delete('species');
    name
      ? pathToModify.searchParams.set('name', name)
      : pathToModify.searchParams.delete('name');
    type
      ? pathToModify.searchParams.set('type', type)
      : pathToModify.searchParams.delete('type');

    window.location.replace(`${pathToModify.pathname}${pathToModify.search}`);
  }, [status, gender, specie, name, type]);

  const resetFilters = useCallback(() => {
    setStatus('Status');
    setGender('Gender');
    setSpecie('Species');
    setName('');
    setType('');

    window.location.replace(new URL(window.location.href).pathname);
  }, []);

  return (
    <FilterContainer>
      <GridCell>
        <SelectedValue
          onClick={toggleMenu('status')}
          isOpened={isStatusMenuOpened}
          isValueSet={status !== 'Status'}
          className="status toggler"
        >
          {status}
          <MenuTogglerSVG
            isOpened={isStatusMenuOpened}
            menuName={'status'}
            setDefaultValue={setDefaultValue}
            value={status}
          />
        </SelectedValue>

        <SelectList
          height={isStatusMenuOpened ? Math.min(statuses.length, 5) * 29 : 0}
        >
          {statuses.map((statusName) => {
            return (
              <SelectElem
                key={statusName}
                onClick={changeMenuValue('status', statusName)}
                isActive={statusName === status}
              >
                {statusName}
              </SelectElem>
            );
          })}
        </SelectList>
      </GridCell>

      <GridCell>
        <SelectedValue
          onClick={toggleMenu('gender')}
          isOpened={isGenderMenuOpened}
          isValueSet={gender !== 'Gender'}
          className="gender toggler"
        >
          {gender}
          <MenuTogglerSVG
            isOpened={isGenderMenuOpened}
            menuName={'gender'}
            setDefaultValue={setDefaultValue}
            value={gender}
          />
        </SelectedValue>

        <SelectList
          height={isGenderMenuOpened ? Math.min(genders.length, 5) * 29 : 0}
        >
          {genders.map((genderName) => {
            return (
              <SelectElem
                key={genderName}
                onClick={changeMenuValue('gender', genderName)}
                isActive={genderName === gender}
              >
                {genderName}
              </SelectElem>
            );
          })}
        </SelectList>
      </GridCell>

      <GridCell>
        <SelectedValue
          onClick={toggleMenu('species')}
          isOpened={isSpeciesMenuOpened}
          isValueSet={specie !== 'Species'}
          className="species toggler"
        >
          {specie}
          <MenuTogglerSVG
            isOpened={isSpeciesMenuOpened}
            menuName={'species'}
            setDefaultValue={setDefaultValue}
            value={specie}
          />
        </SelectedValue>

        <SelectList
          height={isSpeciesMenuOpened ? Math.min(species.length, 5) * 29 : 0}
        >
          {species.map((specieName) => {
            return (
              <SelectElem
                key={specieName}
                onClick={changeMenuValue('species', specieName)}
                isActive={specieName === specie}
              >
                {specieName}
              </SelectElem>
            );
          })}
        </SelectList>
      </GridCell>

      <GridCell>
        <TextField placeholder="Name" onInput={changeName} value={name} />
      </GridCell>

      <GridCell>
        <TextField placeholder="Type" onInput={changeType} value={type} />
      </GridCell>

      <GridCell>
        <ButtonsContainer>
          <InteractionButton actionType={'Apply'} onClick={applyFilters}>
            Apply
          </InteractionButton>

          <InteractionButton actionType={'Reset'} onClick={resetFilters}>
            Reset
          </InteractionButton>
        </ButtonsContainer>
      </GridCell>
    </FilterContainer>
  );
}

function MenuTogglerSVG({ menuName, value, isOpened, setDefaultValue }) {
  const isValueSet =
    (menuName === 'status' && value !== 'Status') ||
    (menuName === 'gender' && value !== 'Gender') ||
    (menuName === 'species' && value !== 'Species');

  return (
    <StyledMenuToggler
      isOpened={isOpened}
      isValueSet={isValueSet}
      onClick={setDefaultValue(menuName)}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`${menuName} svg-icon`}
    >
      {isValueSet ? (
        <>
          <MenuTogglerPATH
            d="M4 12L8 8L12 12"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <MenuTogglerPATH
            d="M4 4L8 8L12 4"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <MenuTogglerPATH
          d="M4 10L8 6L12 10"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </StyledMenuToggler>
  );
}
const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 145px);
  column-gap: 10px;
  row-gap: 10px;

  @media (max-width: 950px) {
    column-gap: 15px;
    row-gap: 15px;
  }

  @media (max-width: 530px) {
    grid-template-columns: none;
  }
`;
const GridCell = styled.div`
  position: relative;
`;
const SelectedValue = styled.p`
  color: ${(props) => {
    return props.isValueSet ? 'white' : '#b3b3b3';
  }};
  background-color: ${(props) => (props.isOpened ? '#334466' : '#263750')};
  border: 1px solid #83bf46;
  padding: 8px 6px;
  border-radius: 5px;
  cursor: default;
  display: flex;
  justify-content: space-between;
  user-select: none;

  &:hover {
    background-color: #334466;
  }
  &:hover svg path {
    stroke: white;
  }
`;
const SelectList = styled.ul`
  position: absolute;
  top: 40px;
  list-style: none;
  width: 145px;
  background-color: white;
  border-radius: 5px;
  cursor: default;
  overflow: auto;
  transition: 0.3s ease;
  height: ${(props) => props.height + 'px'};
  z-index: 100;

  &::-webkit-scrollbar {
    width: ${(props) => (props.height / 29 === 5 ? '4px' : '0px')};
  }
  &::-webkit-scrollbar-thumb {
    transition: 0.3s ease;
    background-color: #d9d9d9;
  }
`;
const SelectElem = styled.li`
  color: black;
  padding: 5px 0 5px 5px;
  font-weight: ${(props) => (props.isActive ? '500' : '400')};

  &:hover {
    background-color: #83bf4633;
  }
`;
const StyledMenuToggler = styled.svg`
  transition: 0.3s ease;
  transform: ${(props) => {
    return props.isOpened || props.isValueSet ? 'rotateZ(180deg)' : '';
  }};

  & path {
    stroke: ${(props) => (props.isOpened ? 'white' : '#b2b2b2')};
  }
  &:hover path {
    stroke: #83bf46 !important;
  }
`;
const MenuTogglerPATH = styled.path`
  stroke: #b2b2b2;
`;
const TextField = styled.input.attrs({ type: 'text' })`
  color: white;
  background-color: #263750;
  border: 1px solid #83bf46;
  padding: 8px 6px;
  border-radius: 5px;
  width: 100%;
  outline: none;
  font-size: 1em;
  text-overflow: ellipsis;

  &::placeholder {
    color: #b3b3b3;
  }

  &:focus,
  &:hover {
    background-color: #334466;
  }
`;
const ButtonsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  column-gap: 10px;

  @media (max-width: 530px) {
    flex-direction: column;
    row-gap: 15px;
  }
`;
const InteractionButton = styled.button`
  color: ${(props) => (props.actionType === 'Apply' ? '#83bf46' : '#ff5152')};
  background-color: #001832;
  border: 1px solid;
  width: 50%;
  border-color: ${(props) => {
    return props.actionType === 'Apply' ? '#83bf46' : '#ff5152';
  }};
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  padding: 8px 0;

  &:hover {
    background-color: ${(props) => {
      return props.actionType === 'Apply' ? '#83bf46' : '#ff5152';
    }};
    color: white;
  }

  @media (max-width: 530px) {
    width: 100%;
  }
`;

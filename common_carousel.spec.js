import React, {
	TouchableOpacity,
	ScrollView
} from 'react-native';

import { shallow } from 'enzyme';
import sinon from 'sinon';

import Carousel from '../Carousel';
import ViewPager from '../Carousel/ViewPager';

describe('<Carousel/>', () => {
  it('should render', () => {
  	const carousel = shallow(<Carousel />);
  	expect(carousel.find(ViewPager)).to.have.length(1);
  });

  it('skip or continue on wizard', () => {
    const onButtonClick = sinon.spy();
  	const carousel = shallow(<Carousel onPressButton={onButtonClick} />);

  	carousel.find(TouchableOpacity).simulate('press');
  	expect(onButtonClick.calledOnce).to.equal(true);
  });
});

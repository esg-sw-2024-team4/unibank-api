import { asyncHandler } from '../utils/async-handler.util';

import sequelize from '../config/db';

import passport from '../utils/passport';

import { deleteUser } from '../services/auth.service';
import User from '../models/user.model';
import { FRONT_WEB_LOCAL_URL, FRONT_WEB_URL } from '../config/env';

export const auth = asyncHandler(async (req, res, next) => {
  // #swagger.ignore = true
  await passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    state: JSON.stringify({ local: req.query.local }),
  })(req, res, next);
});

export const authCallback = asyncHandler(async (req, res, next) => {
  // #swagger.ignore = true
  if (req.query?.error) {
    throw new Error('Something went wrong...');
  }
  const state = JSON.parse(req.query.state as string);
  await passport.authenticate(
    'google',
    { failWithError: true },
    async (errAuth: any, user: User, _: any) => {
      try {
        if (errAuth) {
          throw errAuth;
        }
        const redirectURL = `${state.local === 'true' ? FRONT_WEB_LOCAL_URL : FRONT_WEB_URL}?auth=`;
        if (!user) {
          return res.redirect(`${redirectURL}failure`);
        }
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect(`${redirectURL}success`);
        });
      } catch (err) {
        next(err);
      }
    },
  )(req, res, next);
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  // #swagger.description = "세션에 저장된 사용자의 정보 반환"
  if (!req.user?.dataValues) {
    res.status(204).end();
  } else {
    const { id, name, email, point } = req.user!.dataValues;
    res.json({
      id: id,
      name: name,
      email: email,
      point: point,
    });
  }
});

export const signout = asyncHandler(async (req, res) => {
  // #swagger.description = "세션에서 사용자 정보 삭제"
  req.logout((err) => {
    if (err) {
      throw new Error('Failed to logout...');
    }
    req.session.destroy((_err) => {
      if (_err) {
        return res.status(500).json({ message: 'Something went wrong...' });
      }
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logout successful!' });
    });
  });
});

export const deleteAccount = asyncHandler(async (req, res, next) => {
  // #swagger.description = "세션에 저장된 사용자의 정보를 기반으로 데이터베이스 저장된 정보 삭제"
  const { user } = req;
  await sequelize.transaction((tx) => deleteUser(tx, user!.id));
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid');
    res.status(204).end();
  });
});

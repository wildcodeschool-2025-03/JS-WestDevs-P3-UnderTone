import path from "node:path";
import type { RequestHandler } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "public/uploads/");
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${crypto.randomUUID()}`;
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).toLowerCase();
    cb(null, `${base}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage: storage });

const uploadUserProfilePicture: RequestHandler = (req, res, next) => {
  const uploader = upload.single("profile_picture");

  uploader(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ message: `File upload error: ${err.message}` });
      }
      return next(err);
    }
    next();
  });
};

const userProfilePicture: RequestHandler = (req, res, next) => {
  try {
    if (req.file) {
      req.body.profile_picture = `/uploads/${req.file.filename}`;
    }
    next();
  } catch (err) {
    next(err);
  }
};

const uploadConcertPlaceFiles: RequestHandler = (req, res, next) => {
  const uploader = upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "menu", maxCount: 1 },
    { name: "photos", maxCount: 5 },
  ]);

  uploader(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ message: `File upload error: ${err.message}` });
      }
      return next(err);
    }
    next();
  });
};

const concertPlaceFiles: RequestHandler = (req, res, next) => {
  try {
    const profilePictureFile = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )?.profile_picture?.[0];

    if (profilePictureFile) {
      req.body.profile_picture = `/uploads/${profilePictureFile.filename}`;
    }

    const menuFile = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )?.menu?.[0];

    if (menuFile) {
      req.body.menu = `/uploads/${menuFile.filename}`;
    }

    const photosFiles = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )?.photos;

    if (photosFiles && photosFiles.length > 0) {
      req.body.photos = photosFiles.map((file) => `/uploads/${file.filename}`);
    }
    next();
  } catch (err) {
    next(err);
  }
};

const uploadArtistFiles: RequestHandler = (req, res, next) => {
  const uploader = upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "demo", maxCount: 1 },
    { name: "photos", maxCount: 5 },
  ]);

  uploader(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ message: `File upload error: ${err.message}` });
      }
      return next(err);
    }
    next();
  });
};

const artistFiles: RequestHandler = (req, res, next) => {
  try {
    const profilePictureFile = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )?.profile_picture?.[0];

    if (profilePictureFile) {
      req.body.profile_picture = `/uploads/${profilePictureFile.filename}`;
    }

    const demoFile = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )?.demo?.[0];

    if (demoFile) {
      req.body.demo = `/uploads/${demoFile.filename}`;
    }

    const photosFiles = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )?.photos;

    if (photosFiles && photosFiles.length > 0) {
      req.body.photos = photosFiles.map((file) => `/uploads/${file.filename}`);
    }
    next();
  } catch (err) {
    next(err);
  }
};

export {
  uploadConcertPlaceFiles,
  concertPlaceFiles,
  uploadArtistFiles,
  artistFiles,
  uploadUserProfilePicture,
  userProfilePicture,
};

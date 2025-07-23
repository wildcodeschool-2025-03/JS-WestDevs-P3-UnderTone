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
      req.body.profile_picture = `http://localhost:3310/uploads/${req.file.filename}`;
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
      req.body.profile_picture = `http://localhost:3310/uploads/${profilePictureFile.filename}`;
    }

    const menuFile = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )?.menu?.[0];

    if (menuFile) {
      req.body.menu = `http://localhost:3310/uploads/${menuFile.filename}`;
    }

    const photosFiles = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )?.photos;

    if (photosFiles && photosFiles.length > 0) {
      req.body.photos = photosFiles.map(
        (file) => `http://localhost:3310/uploads/${file.filename}`,
      );
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
      req.body.profile_picture = `http://localhost:3310/uploads/${profilePictureFile.filename}`;
    }

    const demoFile = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )?.demo?.[0];

    if (demoFile) {
      req.body.demo = `http://localhost:3310/uploads/${demoFile.filename}`;
    }

    const photosFiles = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )?.photos;

    if (photosFiles && photosFiles.length > 0) {
      req.body.photos = photosFiles.map(
        (file) => `http://localhost:3310/uploads/${file.filename}`,
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};

const uploadEventFile: RequestHandler = (req, res, next) => {
  const uploader = upload.single("event_picture");

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

const eventFile: RequestHandler = (req, res, next) => {
  try {
    if (req.file) {
      req.body.event_picture = `http://localhost:3310/uploads/${req.file.filename}`;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default {
  uploadConcertPlaceFiles,
  concertPlaceFiles,
  uploadArtistFiles,
  artistFiles,
  uploadUserProfilePicture,
  userProfilePicture,
  uploadEventFile,
  eventFile,
};

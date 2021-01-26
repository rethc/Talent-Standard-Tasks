using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Talent.Common.Aws;
using Talent.Common.Contracts;
using Imgur.API.Authentication.Impl;
using Imgur.API.Endpoints.Impl;
using Imgur.API.Models;


namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _tempFolder;
        private IAwsService _awsService;
        private ImgurClient _imgurClient;
        private readonly string _clientID = "2d11ba0608dc05d";

        public FileService(IHostingEnvironment environment, 
            IAwsService awsService)
        {
            _environment = environment;
            _tempFolder = "images\\";
            _awsService = awsService;
        }

        public async Task<string> GetFileURL(string id, FileType type)
        {
            string _fileName = "";
            if (id != null && type == FileType.ProfilePhoto)
            {
                _imgurClient = new ImgurClient(_clientID);
                var _endpoint = new ImageEndpoint(_imgurClient);
                return _fileName;
            }
            return _fileName;
        }

        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            string _fileName = "";
            if (file != null && type == FileType.ProfilePhoto)
            {
                _fileName = file.FileName + "-" + DateTime.UtcNow;
                Stream _stream = file.OpenReadStream();

                _imgurClient = new ImgurClient(_clientID);
                var _endpoint = new ImageEndpoint(_imgurClient);
                IImage _image = await _endpoint.UploadImageStreamAsync(_stream);
                _fileName = _image.Link;
                return _fileName;
            }
            return _fileName;
        }

        public async Task<bool> DeleteFile(string id, FileType type)
        {
            //Your code here;
            throw new NotImplementedException();
        }


        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        #endregion
    }
}
